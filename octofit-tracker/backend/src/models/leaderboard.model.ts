import { Schema, model, Types } from "mongoose";

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, default: 0, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
  },
  { timestamps: true },
);

export const LeaderboardModel = model("Leaderboard", leaderboardSchema);
