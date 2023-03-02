import { DeleteTask } from "../../interfaces/useCases";
import { deleteTask } from "../../utils/tasks-manipulation";

export class DeleteTaskService implements DeleteTask {
  async delete(name: string): Promise<void> {
    await deleteTask(name);
  }
}