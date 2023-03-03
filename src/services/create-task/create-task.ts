import { Task } from "../../interfaces/task";
import { CreateTask } from "../../interfaces/useCases";
import { create, read } from "../../utils/tasks-manipulation/tasks-manipulation";

export class CreateTaskService implements CreateTask {
  async create(task: Task): Promise<Task> {
    const tasks = await read();
    if (tasks) {
      const exists = tasks.find(t => t.name === task.name);
      if (!exists) {
        await create(task);
      }
    } else {
      await create(task);
    }

    return task;
  }
}
