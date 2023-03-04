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
      .delete("/tasks/")
      .send({})
      .expect(400)
  })

  it("Should return 404 if task no exists", async () => {
    await request(app)
      .delete("/tasks/")
      .send({ name: "Task"})
      .expect(404)
  })

  it("Should return 204 on success", async () => {
    await request(app)
      .delete("/tasks/")
      .send({ name })
      .expect(204)
  })
})