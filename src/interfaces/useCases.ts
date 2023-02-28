import { Task } from './task';

export interface CreateTask {
  create(task: Task): Promise<Task>
}
