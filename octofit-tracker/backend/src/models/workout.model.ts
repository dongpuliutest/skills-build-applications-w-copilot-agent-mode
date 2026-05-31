import { Schema, model, Types } from "mongoose";

const workoutSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    goal: { type: String, default: "" },
    suggestedDurationMinutes: { type: Number, default: 30, min: 1 },
    exercises: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const WorkoutModel = model("Workout", workoutSchema);
