import { ValidateBody } from "../../interfaces/validate-body"
import { CreateTaskController } from "./create-task"
import { CreateTask } from '../../interfaces/useCases';
import { Task } from '../../interfaces/task';
import { HttpRequest } from '../../interfaces/http';
import { MissingParamError, ServerError } from "../../interfaces/errors";

const makeHttpRequest = ():HttpRequest => ({
  body: makeTask()
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

const makeCreateTaskStub = (): CreateTask => {
  class CreateTaskStub implements CreateTask {
    create(task: Task): Promise<Task> {
      return new Promise(resolve => resolve(makeTask()));
    }
  }

  return new CreateTaskStub();
}

interface SutTypes {
  sut: CreateTaskController
  validateBodyStub: ValidateBody
  createTaskStub: CreateTask
}

const makeSut = (): SutTypes => {
  const validateBodyStub = makeValidateBodyStub();
  const createTaskStub = makeCreateTaskStub();
  const sut = new CreateTaskController(validateBodyStub, createTaskStub);

  return {
    sut,
    validateBodyStub,
    createTaskStub
  }
}

describe("CreateTask Controller", () => {
  it("Should call ValidateBody with correct values", async () => {
    const { sut, validateBodyStub } = makeSut();

    const validSpy = jest.spyOn(validateBodyStub, "isValid");
    await sut.handle(makeHttpRequest());

    expect(validSpy).toHaveBeenCalledWith(makeTask());
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

  it("Should call CreateTask with correct values", async () => {
    const { sut, createTaskStub } = makeSut();

    const createSpy = jest.spyOn(createTaskStub, "create");
    await sut.handle(makeHttpRequest());

    expect(createSpy).toHaveBeenCalledWith(makeTask());
  })

  it("Should return 500 if CreateTask throws", async () => {
    const { sut, createTaskStub } = makeSut();

    jest.spyOn(createTaskStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it("Should return 201 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(makeTask());
  })
})
