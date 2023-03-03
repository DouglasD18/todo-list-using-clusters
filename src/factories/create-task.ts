import { CreateTaskController } from "../controllers/create-task/create-task";
import { CreateTaskService } from "../services/create-task/create-task";
import { ValidateBodyAdapter } from "../utils/validate-body/validaty-body";

export const makeCreateTask = (): CreateTaskController => {
  const validateBody = new ValidateBodyAdapter();
  const createTask = new CreateTaskService();
  return new CreateTaskController(validateBody, createTask);
}