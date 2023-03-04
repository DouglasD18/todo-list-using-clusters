import request from "supertest";
import app from "../../config/app";
import fs from "node:fs/promises";
import path from "node:path";
import { create } from "../../utils/tasks-manipulation/tasks-manipulation";

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

  it("Should return 200 on success", async () => {
    await request(app)
      .get("/tasks/")
      .expect(200, [task])
  })
})