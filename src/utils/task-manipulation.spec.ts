import { read } from "./tasks-manipulation"
import fs from 'node:fs/promises';
import path from 'node:path';
import { Task } from "../interfaces/task";

const file = path.resolve("tasks.json");

const insertFakeTasks = async () => {
  const tasks = makeTasks();
  const data = JSON.stringify(tasks);
  await fs.writeFile(file, data)
}

const makeTasks = (): Task[] => {
  return [
    {
      name: "Code",
      description: "So much code",
      isDone: false
    }
  ]
}

describe("TasksManipulation Utils", () => {
  afterEach(async () => {
    await fs.writeFile(file, []);
  })

  describe("read", () => {
    it("Should return void if do not have Tasks", async () => {
      const tasks = await read();

      expect(tasks[0]).toBeFalsy()
    })

    it("Should return the correct Tasks when exists", async () => {
      await insertFakeTasks();

      const tasks = await read();

      expect(tasks).toEqual(makeTasks());
    })
  })
})