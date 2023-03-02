import fs from "fs/promises";
import path from "path";
import { Task } from '../../interfaces/task';
import { CreateTaskService } from "./create-task";
import { read } from "../../utils/tasks-manipulation";

const file = path.resolve("tasks.json");

const makeFakeTask = (): Task => ({
  name: "Task",
  description: "A Task",
  isDone: true
})

describe("CreateTask Service", () => {
  afterEach(async () => {
    await fs.writeFile(file, []);
  })

  it("Should insert a Task in the file", async () => {
    const sut = new CreateTaskService();
    const otherTask = {
      name: "New Task",
      description: "A Task",
      isDone: false
    }

    await sut.create(makeFakeTask())
    const task = await read();
    expect(task[0]).toEqual(makeFakeTask());

    await sut.create(otherTask)
    const tasks = await read();
    expect(tasks[1]).toEqual(otherTask);
  })

  it("Should not insert a Task with a name that already exists", async () => {
    const sut = new CreateTaskService();
    const otherTask = {
      name: "Task",
      description: "A Task",
      isDone: false
    }

    await sut.create(makeFakeTask())
    const task = await read();
    expect(task[0]).toEqual(makeFakeTask());

    await sut.create(otherTask)
    const tasks = await read();
    expect(tasks[1]).toBeFalsy();
  })
})