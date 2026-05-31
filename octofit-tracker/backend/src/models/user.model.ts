import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImageUrl: { type: String, default: "" },
    fitnessLevel: { type: String, default: "beginner" },
  },
  { timestamps: true },
);

export const UserModel = model("User", userSchema);
