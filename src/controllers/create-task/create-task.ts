import { ValidateBody } from "../../interfaces/validate-body";
import { CreateTask } from '../../interfaces/useCases';
import { HttpRequest, HttpResponse } from '../../interfaces/http';
import { MissingParamError, ServerError } from "../../interfaces/errors";
import { Controller } from "../../interfaces/controller";

export class CreateTaskController implements Controller {
  constructor(
    private validateBody: ValidateBody,
    private createTask: CreateTask
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const isValid = this.validateBody.isValid(body);
      if (typeof isValid === "string") {
        return {
          statusCode: 400,
          body: new MissingParamError(isValid)
        }
      }

      const task = await this.createTask.create(body);
      return {
        statusCode: 201,
        body: task
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}