import { Task } from "../../interfaces/task";
import { ReadTasks } from "../../interfaces/useCases";
import { read } from "../../utils/tasks-manipulation/tasks-manipulation";

export class ReadTasksService implements ReadTasks {
  async read(): Promise<Task[] | []> {
    const tasks = await read();

    if (tasks) {
      return tasks;
    }

    return [];
  }
}