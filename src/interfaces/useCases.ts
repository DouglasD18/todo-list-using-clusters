import { Task } from './task';

export interface CreateTask {
  create(task: Task): Promise<Task>
}

export interface ReadTasks {
  read(): Promise<Task[]>
}

export interface UpdateTask {
  update(request: { name: string, task: Task }): Promise<Task>
}

export interface ReadOneTask {
  read(name: string): Promise<Task | undefined>
}

export interface DeleteTask {
  delete(name: string): Promise<string>
}
