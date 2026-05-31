import { Router } from "express";
import { WorkoutModel } from "../models/workout.model";
import { UserModel } from "../models/user.model";

const workoutsRouter = Router();

workoutsRouter.get("/", async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ createdAt: -1 }).limit(100);
  res.status(200).json(workouts);
});

workoutsRouter.post("/", async (req, res) => {
  try {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: "Failed to create workout", error });
  }
});

workoutsRouter.post("/seed", async (_req, res) => {
  try {
    const now = Date.now();
    const user =
      (await UserModel.findOne().sort({ createdAt: -1 })) ||
      (await UserModel.create({
        name: "Workout User",
        email: `workout.user.${now}@example.com`,
        fitnessLevel: "advanced",
      }));

    const workout = await WorkoutModel.create({
      userId: user._id,
      title: "Full Body Starter",
      goal: "General strength and conditioning",
      suggestedDurationMinutes: 40,
      exercises: ["Squats", "Push-ups", "Plank"],
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: "Failed to seed workout", error });
  }
});

export default workoutsRouter;
