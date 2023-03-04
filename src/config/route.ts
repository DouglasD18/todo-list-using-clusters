import { Express, Router } from "express"
import createTaskRouter from "../route/create-task/create-task";
import readTasksRouter from "../route/read-tasks/read-tasks";
import updateTaskRouter from "../route/update-task/update-task";

export default (app: Express): void => {
  const router = Router();
  app.use("/tasks", router);
  createTaskRouter(router);
  readTasksRouter(router);
  updateTaskRouter(router);
}