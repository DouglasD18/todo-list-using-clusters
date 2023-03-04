import request from "supertest";
import app from "../../config/app";
import fs from "node:fs/promises";
import path from "node:path";
import { create } from "../../utils/tasks-manipulation/tasks-manipulation";
import { Task } from "../../interfaces/task";

const file = path.resolve("tasks.json");

const name = "Any_name";
const description = "Any description";
const isDone = true;

const task = { name, description, isDone }

describe("CreateTask Route", () => {
  beforeAll(async () => {
    await create(task);
  })
  
  afterAll(async () => {
    await fs.writeFile(file, []);
  })

  it("Should return 400 if missing name", async () => {
    await request(app)
      .put("/tasks/")
      .send({ task })
      .expect(400)
  })

  it("Should return 400 if missing name in task", async () => {
    await request(app)
      .put("/tasks/")
      .send({ name, task: { description, isDone } })
      .expect(400)
  })

  it("Should return 400 if missing description", async () => {
    await request(app)
      .put("/tasks/")
      .send({ name, task: { name, isDone } })
      .expect(400)
  })

  it("Should return 400 if missing isDone", async () => {
    await request(app)
      .put("/tasks/")
      .send({ name, task: { name, description } })
      .expect(400)
  })

  it("Should return 404 if task no exists", async () => {
    await request(app)
      .put("/tasks/")
      .send({ name: "Task", task })
      .expect(404)
  })

  it("Should return 200 on success", async () => {
    const newTask: Task = { name, description: "Other description", isDone }

    await request(app)
      .put("/tasks/")
      .send({ name, task: newTask })
      .expect(200, {
        name,
        description: "Other description",
        isDone
      })
  })
})