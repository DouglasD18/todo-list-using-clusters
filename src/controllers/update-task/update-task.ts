import { UpdateTask } from "../../interfaces/useCases";
import { HttpRequest, HttpResponse } from '../../interfaces/http';
import { MissingParamError, ServerError } from "../../interfaces/errors";
import { ValidateBody } from "../../interfaces/validate-body";

export class UpdateTaskController {
  constructor(
    private validateBody: ValidateBody,
    private updateTask: UpdateTask
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