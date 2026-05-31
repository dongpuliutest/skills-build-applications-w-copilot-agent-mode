import { Router } from "express";
import { TeamModel } from "../models/team.model";
import { UserModel } from "../models/user.model";

const teamsRouter = Router();

teamsRouter.get("/", async (_req, res) => {
  const teams = await TeamModel.find().sort({ createdAt: -1 }).limit(100);
  res.status(200).json(teams);
});

teamsRouter.post("/", async (req, res) => {
  try {
    const team = await TeamModel.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: "Failed to create team", error });
  }
});

teamsRouter.post("/seed", async (_req, res) => {
  try {
    const now = Date.now();
    const owner =
      (await UserModel.findOne().sort({ createdAt: -1 })) ||
      (await UserModel.create({
        name: "Team Owner",
        email: `team.owner.${now}@example.com`,
        fitnessLevel: "advanced",
      }));

    const team = await TeamModel.create({
      name: "Octo Sprinters",
      description: "Starter team for API validation",
      ownerId: owner._id,
      memberIds: [owner._id],
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: "Failed to seed team", error });
  }
});

export default teamsRouter;
