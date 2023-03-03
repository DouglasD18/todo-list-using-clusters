import fs from "node:fs/promises";
import path from "node:path";
import { Task } from "../../interfaces/task";

const file = path.resolve("tasks.json");

const createNewFile = async (newTasks: Task[]): Promise<void> => {
  const data = JSON.stringify(newTasks);
  await fs.writeFile(file, data);
}

export async function read(): Promise<Task[] | void> {
  if (file) {
    const tasks = await fs.readFile(file, { encoding: "utf-8" });
    if (tasks) {
      return JSON.parse(tasks);
    }
  }
}

export async function readOne(name: string): Promise<Task | void> {
  const tasks = await read();
  if (tasks) {
    const task = tasks.find(task => task.name === name);
    return task;
  }
}

export async function create(task: Task): Promise<Task> {
  const tasks = await read();

  if (tasks) {
    await fs.unlink(file);
    const newTasks = [...tasks, task];
    await createNewFile(newTasks);
  } else {
    const newTasks = [task];
    await createNewFile(newTasks);
  }

  return task;
}

export async function update(name: string, task: Task): Promise<Task> {
  const tasks = await read();

  if (tasks) {
    await fs.unlink(file);
    const newTasks = tasks.map(oldTask => {
      if (oldTask.name === name) {
        return task;
      }
      return oldTask;
    })

    await createNewFile(newTasks);
  }

  return task;
}

export async function deleteTask(name: string): Promise<void> {
  const tasks = await read();

  if (tasks) {
    await fs.unlink(file);
    const newTasks = tasks.filter(task => task.name !== name);

    if (newTasks) {
      await createNewFile(newTasks);
    } else {
      await fs.writeFile(file, []);
    }
  }
}
