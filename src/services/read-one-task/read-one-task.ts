import { Task } from "../../interfaces/task";
import { ReadOneTask } from "../../interfaces/useCases";
import { readOne } from "../../utils/tasks-manipulation/tasks-manipulation";

export class ReadOneTaskService implements ReadOneTask {
  async read(name: string): Promise<Task | undefined> {
    const task = await readOne(name);

    if (task) return task;

    return undefined;
  }
}