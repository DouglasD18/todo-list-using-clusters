import fs from "node:fs/promises";
import path from "node:path";
import { Task } from "../../interfaces/task";
import { create, read } from "../../utils/tasks-manipulation/tasks-manipulation";
import { DeleteTaskService } from "./delete-task";

const file = path.resolve("tasks.json");

const makeFakeTask = (): Task => ({
  name: "Task",
  description: "A Task",
  isDone: true
})

const makeOtherFakeTask = (): Task => ({
  name: "Read",
  description: "Read a lot of books",
  isDone: false
})

describe("DeleteTask Service", () => {
  afterEach(async () => {
    await fs.writeFile(file, []);
  })

  it("Should Delete the correct Task", async () => {
    const sut = new DeleteTaskService();

    await create(makeFakeTask());
    await create(makeOtherFakeTask());

    await sut.delete("Task")
    const tasks = await read();

    expect(tasks[0]).toEqual(makeOtherFakeTask());
  })
})