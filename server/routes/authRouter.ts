import express, { type Request, type Response } from "express";
import { isEmpty } from "../isEmpty.js";
import { prisma } from "../lib/prisma.js";
import axios from "axios";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import type { TChild } from "../types.js";

export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password || isEmpty([identifier, password]))
      return res.status(400).send("Identifier and password are required.");

    let bacToken;
    try {
      const response = await axios.post("https://sisapi.bac.edu.lb/api/login", {
        identifier,
        password,
      });

      if (response.data.success) {
        bacToken = response.data.data._token;
      } else {
        return res.status(500).send("BAC authentication failed.");
      }
    } catch (error: any) {
      return res.status(error.response.status).send(error.message);
    }

    let children: Array<{ id: string; class: string; learner: string }> = [];
    let lastName: string;
    try {
      const response = await axios.get(
        `https://sisapi.bac.edu.lb/api/select-child`,
        {
          headers: {
            Authorization: `Bearer ${bacToken}`,
          },
        },
      );

      children = response.data.data.learners;

      lastName = children[0]?.learner
        .split(" ")
        [children.length - 1]?.toLocaleLowerCase() as string;
    } catch (error: any) {
      return res.status(error.response.status).send(error.message);
    }

    const parent = await prisma.parent.findFirst({
      where: {
        email: identifier,
      },
      include: {
        children: true,
      },
    });

    let dbChildren: Array<TChild> = (parent?.children as Array<TChild>) || [];

    if (!parent) {
      const newParent = await prisma.parent.create({
        data: {
          email: identifier,
          name: lastName,
        },
      });

      children.map(async (child) => {
        const newChild = await prisma.child.create({
          data: {
            name: ((child.learner.split(" ")[0] as string) +
              " " +
              child.learner.split(" ")[1]) as string as string,
            parentId: newParent.id,
            grade: child.class,
          },
        });

        dbChildren.push(newChild as TChild);
      });
    }

    const token = await sign(
      { id: parent?.id, children: dbChildren, parent, isAdmin: false },
      process.env.JWT_SECRET as string,
    );

    return res.status(200).json({ bacToken, token, parent });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});

authRouter.post("/createAdmin", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || isEmpty([username, password]))
      return res.status(400).send("Username and password are required.");

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: { username },
    });
    if (existingAdmin) {
      return res.status(400).send("Admin with this username already exists.");
    }

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: await hash(password, 10),
      },
    });

    return res.status(201).json({ admin: newAdmin });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});
