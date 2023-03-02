import fs from "fs/promises";
import path from "path";
import { Task } from "../../interfaces/task";
import { ReadTasksService } from "./read-tasks";
import { create } from "../../utils/tasks-manipulation";

const file = path.resolve("tasks.json");

const makeFakeTask = (): Task => ({
  name: "Task",
  description: "A Task",
  isDone: true
})

describe("ReadTasks Controller", () => {
  afterEach(async () => {
    await fs.writeFile(file, []);
  })

  it("Should return an empty array if do not exists Tasks", async () => {
    const sut = new ReadTasksService();

    const tasks = await sut.read();

    expect(tasks).toEqual([]);
  })

  it("Should return all Tasks", async () => {
    const sut = new ReadTasksService();

    await create(makeFakeTask());
    await create({
      name: "Nome",
      description: "Descrição",
      isDone: true
    })

    const tasks = await sut.read();

    expect(tasks[0]).toEqual(makeFakeTask());
    expect(tasks[1]).toBeTruthy();
  })
})