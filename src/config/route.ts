import { Express, Router } from "express"
import createTaskRouter from "../route/create-task/create-task";

export default (app: Express): void => {
  const router = Router();
  app.use("/tasks", router);
  createTaskRouter(router);
}