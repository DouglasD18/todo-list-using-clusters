import { UpdateTaskController } from "../controllers/update-task/update-task";
import { ValidateBodyAdapter } from "../utils/validate-body/validaty-body";
import { ReadOneTaskService } from '../services/read-one-task/read-one-task';
import { UpdateTaskService } from "../services/update-task/update-task";

export const makeUpdateTask = (): UpdateTaskController => {
  const validateBody = new ValidateBodyAdapter();
  const readOneTask = new ReadOneTaskService();
  const updateTask = new UpdateTaskService();
  return new UpdateTaskController(validateBody, readOneTask, updateTask);
}