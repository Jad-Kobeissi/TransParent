import express, { response, type Request, type Response } from "express";
import { decode, verify } from "jsonwebtoken";
import type { TChild, TJWT } from "../types.js";
import { prisma } from "../lib/prisma.js";
import { isEmpty } from "../isEmpty.js";

export const incidentsRouter = express.Router();

incidentsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ")[1] as string;

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET!))
      return res.status(401).send("Unauthorized");

    const decoded = verify(authHeader, process.env.JWT_SECRET!) as TJWT;

    const childrenIds = decoded.children.map((child: TChild) => child.id);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const offset = (page - 1) * limit;
    const incidents = await prisma.incident.findMany({
      where: {
        childId: {
          in: childrenIds,
        },
      },
      orderBy: {
        occurredAt: "desc",
      },
      include: {
        Child: {
          include: {
            Parent: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });

    if (incidents.length == 0)
      return res.status(404).send("No incidents found");
    return res.status(200).json(incidents);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});

incidentsRouter.get("/child/:id", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ")[1] as string;

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET!))
      return res.status(401).send("Unauthorized");

    const decoded = decode(authHeader) as TJWT;

    const { id } = req.params;
    const incidents = await prisma.incident.findMany({
      where: {
        childId: Number(id),
      },
      include: {
        Child: true,
      },
    });

    if (incidents.length == 0)
      return res.status(404).send("No incidents found");
    return res.status(200).json(incidents);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});
