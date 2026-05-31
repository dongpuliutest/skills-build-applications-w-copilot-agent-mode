import { Router } from "express";
import { UserModel } from "../models/user.model";

const usersRouter = Router();

usersRouter.get("/", async (_req, res) => {
  const users = await UserModel.find().sort({ createdAt: -1 }).limit(100);
  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error });
  }
});

usersRouter.post("/seed", async (_req, res) => {
  try {
    const now = Date.now();
    const user = await UserModel.create({
      name: "Octo Runner",
      email: `octo.runner.${now}@example.com`,
      profileImageUrl: "",
      fitnessLevel: "intermediate",
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to seed user", error });
  }
});

export default usersRouter;
