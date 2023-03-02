import fs from "node:fs/promises";
import path from "node:path";
import { Task } from "../../interfaces/task";
import { create, read } from "../../utils/tasks-manipulation";
import { UpdateTaskService } from "./update-task";

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

describe("UpdateTask Service", () => {
  afterEach(async () => {
    await fs.writeFile(file, []);
  })

  it("Should update the correct Task", async () => {
    const sut = new UpdateTaskService();

    await create(makeFakeTask());
    await create(makeOtherFakeTask());

    const updated = await sut.update({ name: "Read", task: {
      name: "Read",
      description: "Read a lot of books",
      isDone: true
    }})
    const tasks = await read();

    expect(tasks[1]).toEqual(updated);
  })
})