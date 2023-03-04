import fs from "node:fs/promises";
import path from "node:path";
import { Task } from "../../interfaces/task";
import { ReadOneTaskService } from "./read-one-task";
import { create } from "../../utils/tasks-manipulation/tasks-manipulation";

const file = path.resolve("tasks.json");

const makeFakeTask = (): Task => ({
  name: "Task",
  description: "A Task",
  isDone: true
})

describe("ReadOneTask Service", () => {
  afterEach(async () => {
    await fs.writeFile(file, []);
  })

  it("Should return an undefined if do not have any Task with the same name", async () => {
    const sut = new ReadOneTaskService();

    await create(makeFakeTask());
    const task = await sut.read("Code");

    expect(task).toEqual(undefined);
  })

  it("Should return the correct Task", async () => {
    const sut = new ReadOneTaskService();

    await create(makeFakeTask());
    await create({
      name: "Code",
      description: "Code to much",
      isDone: false
    })
    const task = await sut.read("Code");

    expect(task).toEqual({
      name: "Code",
      description: "Code to much",
      isDone: false
    });
  })
})