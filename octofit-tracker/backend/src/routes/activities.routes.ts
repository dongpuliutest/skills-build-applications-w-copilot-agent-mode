import { Router } from "express";
import { ActivityModel } from "../models/activity.model";
import { UserModel } from "../models/user.model";

const activitiesRouter = Router();

activitiesRouter.get("/", async (_req, res) => {
  const activities = await ActivityModel.find()
    .sort({ performedAt: -1 })
    .limit(200);
  res.status(200).json(activities);
});

activitiesRouter.post("/", async (req, res) => {
  try {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: "Failed to create activity", error });
  }
});

activitiesRouter.post("/seed", async (_req, res) => {
  try {
    const now = Date.now();
    const user =
      (await UserModel.findOne().sort({ createdAt: -1 })) ||
      (await UserModel.create({
        name: "Activity User",
        email: `activity.user.${now}@example.com`,
        fitnessLevel: "beginner",
      }));

    const activity = await ActivityModel.create({
      userId: user._id,
      type: "running",
      durationMinutes: 35,
      caloriesBurned: 320,
      performedAt: new Date(),
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: "Failed to seed activity", error });
  }
});

export default activitiesRouter;
