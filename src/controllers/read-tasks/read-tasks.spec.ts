import { ServerError } from "../../interfaces/errors";
import { Task } from "../../interfaces/task";
import { ReadTasks } from "../../interfaces/useCases";
import { ReadTasksController } from "./read-tasks";

const makeTasks = (): Task[] => {
  return [
    {
      name: "Code",
      description: "Code so much",
      isDone: false
    }
  ]
}

const makeReadTasksStub = (): ReadTasks => {
  class ReadTasksStub implements ReadTasks {
    read(): Promise<Task[]> {
      return new Promise(resolve => resolve(makeTasks()))
    }
  }

  return new ReadTasksStub();
}

interface SutTypes {
  sut: ReadTasksController
  readTasksStub: ReadTasks
}

const makeSut = (): SutTypes => {
  const readTasksStub = makeReadTasksStub();
  const sut = new ReadTasksController(readTasksStub);

  return {
    sut,
    readTasksStub
  }
}

describe("ReadTasks Controller", () => {
  it("Should call ReadTasks", async () => {
    const { sut, readTasksStub } = makeSut();

    const readSpy = jest.spyOn(readTasksStub, "read");
    await sut.handle();

    expect(readSpy).toHaveBeenCalled();
  })

  it("Should return 500 with ReadTasks throws", async () => {
    const { sut, readTasksStub } = makeSut();

    jest.spyOn(readTasksStub, "read").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle();

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle();

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(makeTasks());
  })
})