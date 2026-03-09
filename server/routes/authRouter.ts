import express, { type Request, type Response } from "express";
import { isEmpty } from "../isEmpty.js";
import { prisma } from "../lib/prisma.js";
import axios from "axios";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import type { TChild, TParent } from "../types.js";

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
      console.log(lastName);
    } catch (error: any) {
      return res.status(error.response.status).send(error.message);
    }

    const parent = await prisma.parent.findFirst({
      where: {
        email: identifier,
      },
      include: {
        child: true,
      },
    });

    let dbChildren: Array<TChild> = (parent?.child as Array<TChild>) || [];
    let newParent: any;
    if (!parent) {
      const placeholderParent = await prisma.parent.create({
        data: {
          email: identifier,
          name: lastName,
        },
        include: {
          child: true,
        },
      });

      (children.forEach(async (child) => {
        const newChild = await prisma.child.create({
          data: {
            name: ((child.learner.split(" ")[0] as string) +
              " " +
              child.learner.split(" ")[1]) as string as string,
            parentId: placeholderParent.id,
            grade: child.class,
          },
        });
        dbChildren.push(newChild as TChild);
      }),
        (newParent = await prisma.parent.findFirst({
          where: {
            email: identifier,
          },
          include: {
            child: true,
          },
        })));
    }

    const token = await sign(
      {
        id: parent?.id,
        children: dbChildren,
        parent: parent ? parent : newParent,
        isAdmin: false,
      },
      process.env.JWT_SECRET as string,
    );

    console.log("submitting: " + parent ? parent : newParent);

    console.log("parent: " + parent ? parent : newParent);
    console.log("childrenDb: " + dbChildren);
    console.log("jwt key: " + process.env.JWT_SECRET || "nigga");
    

    return res
      .status(200)
      .json({ bacToken, token, parent: parent ? parent : newParent });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});
