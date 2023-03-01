import { create, read, readOne, uptade } from "./tasks-manipulation"
import fs from 'node:fs/promises';
import path from 'node:path';
import { Task } from "../interfaces/task";

const file = path.resolve("tasks.json");

const fakeTask: Task = {
  name: "Name",
  description: "Faked",
  isDone: false
}

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

      expect(tasks).toBeFalsy()
    })

    it("Should return the correct Tasks when exists", async () => {
      await insertFakeTasks();

      const tasks = await read();

      expect(tasks).toEqual(makeTasks());
    })
  })

  describe("readOne", () => {
    afterEach(async () => {
      await fs.writeFile(file, []);
    })

    it("Should return void if do not have Tasks", async () => {
      const task = await readOne("Code");

      expect(task).toBeFalsy()
    })

    it("Should return undefined if do not have Task with the same name", async () => {
      await insertFakeTasks();

      const task = await readOne("Name");

      expect(task).toBe(undefined);
    })

    it("Should return the correct Task", async () => {
      await insertFakeTasks();
      await create(fakeTask);

      const task = await readOne("Name");

      expect(task).toEqual(fakeTask);
    })
  })

  describe("create", () => {
    afterEach(async () => {
      await fs.writeFile(file, []);
    })

    it("Should insert a task is file is empty", async () => {
      const created = await create(fakeTask);

      const task = await readOne("Name");

      expect(task).toEqual(created);
    })

    it("Should insert a Task with file is not empty too", async () => {
      await insertFakeTasks();

      const created = await create(fakeTask);
      const tasks = await read();

      expect(tasks[1]).toEqual(created);
    })
  })

  describe("update", () => {
    afterEach(async () => {
      await fs.writeFile(file, []);
    })

    it("Should update a Task", async () => {
      await insertFakeTasks();
      const created = await create(fakeTask);

      await uptade("Name", {
        name: "Name",
        description: "Faked",
        isDone: true
      })
      const updated = await readOne("Name");

      expect(created.isDone).toBe(false);
      expect(updated).toBeTruthy();
      if (updated) {
        expect(updated.isDone).toBe(true);
      }
    })
  })
})