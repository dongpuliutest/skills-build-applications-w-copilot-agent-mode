import { Router } from "express";
import { LeaderboardModel } from "../models/leaderboard.model";
import { UserModel } from "../models/user.model";

const leaderboardRouter = Router();

leaderboardRouter.get("/", async (_req, res) => {
  const boards = await LeaderboardModel.find()
    .sort({ createdAt: -1 })
    .limit(20);
  res.status(200).json(boards);
});

leaderboardRouter.post("/", async (req, res) => {
  try {
    const board = await LeaderboardModel.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ message: "Failed to create leaderboard", error });
  }
});

leaderboardRouter.post("/seed", async (_req, res) => {
  try {
    const now = Date.now();
    const user =
      (await UserModel.findOne().sort({ createdAt: -1 })) ||
      (await UserModel.create({
        name: "Leaderboard User",
        email: `leaderboard.user.${now}@example.com`,
        fitnessLevel: "intermediate",
      }));

    const board = await LeaderboardModel.create({
      period: "weekly",
      entries: [
        {
          userId: user._id,
          score: 980,
          rank: 1,
        },
      ],
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ message: "Failed to seed leaderboard", error });
  }
});

export default leaderboardRouter;
