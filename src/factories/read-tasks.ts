import { ReadTasksController } from "../controllers/read-tasks/read-tasks";
import { ReadTasksService } from "../services/read-tasks/read-tasks";

export const makeReadTasksController = (): ReadTasksController => {
  const readTasks = new ReadTasksService();
  return new ReadTasksController(readTasks);
}