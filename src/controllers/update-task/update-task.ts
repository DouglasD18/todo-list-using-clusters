import { ReadOneTask, UpdateTask } from "../../interfaces/useCases";
import { HttpRequest, HttpResponse } from '../../interfaces/http';
import { MissingParamError, NotFoundError, ServerError } from "../../interfaces/errors";
import { ValidateBody } from "../../interfaces/validate-body";
import { Controller } from "../../interfaces/controller";

export class UpdateTaskController implements Controller {
  constructor(
    private validateBody: ValidateBody,
    private readOneTask: ReadOneTask,
    private updateTask: UpdateTask
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const { name } = body;
      if (!name) {
        return {
          statusCode: 400,
          body: new MissingParamError(name)
        }
      }

      const isValid = this.validateBody.isValid(body.task);
      if (typeof isValid === "string") {
        return {
          statusCode: 400,
          body: new MissingParamError(isValid)
        }
      }

      const exists = await this.readOneTask.read(name);
      if (typeof exists === "undefined") {
        return {
          statusCode: 404,
          body: new NotFoundError()
        }
      }

      const tasks = await this.updateTask.update(body);
      return {
        statusCode: 200,
        body: tasks
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}