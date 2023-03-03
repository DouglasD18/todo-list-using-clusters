import { ReadOneTask, DeleteTask } from "../../interfaces/useCases";
import { HttpRequest, HttpResponse } from '../../interfaces/http';
import { MissingParamError, NotFoundError, ServerError } from "../../interfaces/errors";
import { Controller } from "../../interfaces/controller";

export class DeleteTaskController implements Controller {
  constructor(
    private readOneTask: ReadOneTask,
    private deleteTask: DeleteTask
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body: { name } } = httpRequest;
      if (!name) {
        return {
          statusCode: 400,
          body: new MissingParamError("name")
        }
      }

      const exists = await this.readOneTask.read(name);
      if (exists === undefined) {
        return {
          statusCode: 404,
          body: new NotFoundError()
        }
      }

      await this.deleteTask.delete(name);
      return {
        statusCode: 204,
        body: name
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
