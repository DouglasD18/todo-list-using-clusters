import { MissingParamError, NotFoundError, ServerError } from "../../interfaces/errors";
import { HttpRequest } from "../../interfaces/http";
import { Task } from "../../interfaces/task";
import { ReadOneTask, UpdateTask } from "../../interfaces/useCases";
import { ValidateBody } from "../../interfaces/validate-body";
import { UpdateTaskController } from "./update-task";

const name = "any_name";

const makeHttpRequest = (): HttpRequest => ({
  body: {
    name,
    task: makeTask()
  }
})

const makeTask = (): Task => ({
  name: "Code",
  description: "Code so much",
  isDone: false
})

const makeValidateBodyStub = (): ValidateBody => {
  class ValidateBodyStub implements ValidateBody {
    isValid(body: any): string | boolean {
      return true;
    }
  }

  return new ValidateBodyStub();
}

const makeReadOneTaskStub = (): ReadOneTask => {
  class ReadOneTaskStub implements ReadOneTask {
    read(name: string): Promise<Task> {
      return new Promise(resolve => resolve(makeTask()))
    }
  }

  return new ReadOneTaskStub();
}

const makeUpdateTaskStub = (): UpdateTask => {
  class UpdateTaskStub implements UpdateTask {
    update({ name: string, task: Task}): Promise<Task> {
      return new Promise(resolve => resolve(makeTask()));
    }
  }

  return new UpdateTaskStub();
}

interface SutTypes {
  sut: UpdateTaskController
  validateBodyStub: ValidateBody
  readOneTaskStub: ReadOneTask
  updateTaskStub: UpdateTask
}

const makeSut = (): SutTypes => {
  const validateBodyStub = makeValidateBodyStub();
  const readOneTaskStub = makeReadOneTaskStub();
  const updateTaskStub = makeUpdateTaskStub();
  const sut = new UpdateTaskController(validateBodyStub, readOneTaskStub, updateTaskStub);

  return {
    sut,
    validateBodyStub,
    readOneTaskStub,
    updateTaskStub
  }
}

describe("UpdateTask Controller", () => {
  it("Should call ValidateBody with correct values", async () => {
    const { sut, validateBodyStub } = makeSut();
    const httpRequest = makeHttpRequest();
    const { body } = httpRequest;

    const validSpy = jest.spyOn(validateBodyStub, "isValid");
    await sut.handle(httpRequest);

    expect(validSpy).toHaveBeenCalledWith(body);
  })

  it("Should return 400 if ValidateBody return name", async () => {
    const { sut, validateBodyStub } = makeSut();

    jest.spyOn(validateBodyStub, "isValid").mockReturnValueOnce("name");
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  })

  it("Should return 400 if ValidateBody return description", async () => {
    const { sut, validateBodyStub } = makeSut();

    jest.spyOn(validateBodyStub, "isValid").mockReturnValueOnce("description");
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("description"));
  })

  it("Should return 400 if ValidateBody return isDone", async () => {
    const { sut, validateBodyStub } = makeSut();

    jest.spyOn(validateBodyStub, "isValid").mockReturnValueOnce("isDone");
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("isDone"));
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
    expect(httpResponse.body).toEqual(new NotFoundError(name));
  })

  it("Should call UpdateTask with correct values", async () => {
    const { sut, updateTaskStub } = makeSut();
    const httpRequest = makeHttpRequest();
    const { body } = httpRequest;

    const updateSpy = jest.spyOn(updateTaskStub, "update");
    await sut.handle(httpRequest);

    expect(updateSpy).toHaveBeenCalledWith(body);
  })

  it("Should return 500 if UpdateTask throws", async () => {
    const { sut, updateTaskStub } = makeSut();

    jest.spyOn(updateTaskStub, "update").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(makeTask());
  })
})