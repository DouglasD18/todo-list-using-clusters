import { Task } from "../../interfaces/task";
import { UpdateTask } from "../../interfaces/useCases";
import { update } from "../../utils/tasks-manipulation";

export class UpdateTaskService implements UpdateTask {
  async update(request: { name: string; task: Task; }): Promise<Task> {
    const { name, task } = request;
    await update(name, task);

    return task;
  }
}