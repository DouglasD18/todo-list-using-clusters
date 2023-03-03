import { DeleteTaskController } from "../controllers/delete-task/delete-task";
import { DeleteTaskService } from "../services/delete-task/delete-task";
import { ReadOneTaskService } from "../services/read-one-task/read-one-task";

export const makeDeleteTask = (): DeleteTaskController => {
  const readOneTask = new ReadOneTaskService();
  const deleteTask = new DeleteTaskService();
  return new DeleteTaskController(readOneTask, deleteTask);
}