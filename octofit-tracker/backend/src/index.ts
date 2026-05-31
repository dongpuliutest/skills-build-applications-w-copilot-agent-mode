import express from "express";
import mongoose from "mongoose";
import activitiesRouter from "./routes/activities.routes";
import leaderboardRouter from "./routes/leaderboard.routes";
import teamsRouter from "./routes/teams.routes";
import usersRouter from "./routes/users.routes";
import workoutsRouter from "./routes/workouts.routes";

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

const start = async () => {
  try {
    await mongoose.connect(mongoUri, { dbName: "octofit_db" });
    app.listen(port, () => {
      console.log(`Octofit backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
};

void start();
