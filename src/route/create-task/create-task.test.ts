import request from "supertest";
import app from "../../config/app";
import fs from "node:fs/promises";
import path from "node:path";

const file = path.resolve("tasks.json");

const name = "Any_name";
const description = "Any description";
const isDone = true;

describe("CreateTask Route", () => {
  afterAll(async () => {
    await fs.writeFile(file, []);
  })

  it("Should return 400 if missing name", async () => {
    await request(app)
      .post("/tasks/")
      .send({ description, isDone })
      .expect(400)
  })

  it("Should return 400 if missing description", async () => {
    await request(app)
      .post("/tasks/")
      .send({ name, isDone })
      .expect(400)
  })

  it("Should return 400 if missing isDone", async () => {
    await request(app)
      .post("/tasks/")
      .send({ name, description })
      .expect(400)
  })

  it("Should return 201 on success", async () => {
    await request(app)
      .post("/tasks/")
      .send({ name, description, isDone })
      .expect(201, {
        name,
        description,
        isDone
      })
  })
})