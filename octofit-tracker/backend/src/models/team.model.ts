import { Schema, model, Types } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    ownerId: { type: Types.ObjectId, ref: "User", required: true },
    memberIds: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export const TeamModel = model("Team", teamSchema);
