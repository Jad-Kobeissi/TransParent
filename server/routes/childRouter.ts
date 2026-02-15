import express from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const childRouter = express.Router();

childRouter.get("/:id", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET!))
      return res.status(401).send("Unauthorized");

    const { id } = req.params;

    const child = await prisma.child.findUnique({
      where: { id: Number(id) },
      include: {
        Incidents: true,
        parent: true,
      },
    });

    if (!child) return res.status(404).send("Child not found");

    return res.json(child);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});
