import { MissingParamError, NotFoundError, ServerError } from "../../interfaces/errors";
import { HttpRequest } from "../../interfaces/http";
import { Task } from "../../interfaces/task";
import { DeleteTask, ReadOneTask, UpdateTask } from "../../interfaces/useCases";
import { DeleteTaskController } from "./delete-task";

const name = "any_name";

const makeHttpRequest = (): HttpRequest => ({
  body: {
    name
  }
})

const makeTask = (): Task => ({
  name: "Code",
  description: "Code so much",
  isDone: false
})

const makeReadOneTaskStub = (): ReadOneTask => {
  class ReadOneTaskStub implements ReadOneTask {
    read(name: string): Promise<Task> {
      return new Promise(resolve => resolve(makeTask()))
    }
  }

  return new ReadOneTaskStub();
}

const makeDeleteTaskStub = (): DeleteTask => {
  class DeleteTaskStub implements DeleteTask {
    delete(name: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new DeleteTaskStub();
}

interface SutTypes {
  sut: DeleteTaskController
  readOneTaskStub: ReadOneTask
  deleteTaskStub: DeleteTask
}

const makeSut = (): SutTypes => {
  const readOneTaskStub = makeReadOneTaskStub();
  const deleteTaskStub = makeDeleteTaskStub();
  const sut = new DeleteTaskController(readOneTaskStub, deleteTaskStub);

  return {
    sut,
    readOneTaskStub,
    deleteTaskStub
  }
}

describe("UpdateTask Controller", () => {
  it("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: ""
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  })

  it("Should call ReadOneTask with correct values", async () => {
    const { sut, readOneTaskStub } = makeSut();

    const readOneSpy = jest.spyOn(readOneTaskStub, "read");
    await sut.handle(makeHttpRequest());

    expect(readOneSpy).toHaveBeenCalledWith(name);
  })

  it("Should return 500 if ReadOneTask throws", async () => {
    const { sut, readOneTaskStub } = makeSut();

    jest.spyOn(readOneTaskStub, "read").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it("Should return 404 if ReadOneTask returns undefined", async () => {
    const { sut, readOneTaskStub } = makeSut();

    jest.spyOn(readOneTaskStub, "read").mockReturnValueOnce(new Promise(resolve => resolve(undefined)));
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual(new NotFoundError());
  })

  it("Should call DeleteTask with correct values", async () => {
    const { sut, deleteTaskStub } = makeSut();

    const deleteSpy = jest.spyOn(deleteTaskStub, "delete");
    await sut.handle(makeHttpRequest());

    expect(deleteSpy).toHaveBeenCalledWith(name);
  })

  it("Should return 500 if DeleteTask throws", async () => {
    const { sut, deleteTaskStub } = makeSut();

    jest.spyOn(deleteTaskStub, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toEqual(name);
  })
})