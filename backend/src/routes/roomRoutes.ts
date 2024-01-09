import express, { Request, Response } from "express";

export const router = express.Router();

export type Room = {
  title: string;
  id: string;
};

const ROOMS: Room[] = [
  {
    title: "Global Chatroom",
    id: "1",
  },
];

router.get("/", (req: Request, res: Response) => {
  res.json(ROOMS);
});
