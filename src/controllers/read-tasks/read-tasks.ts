import { HttpResponse } from '../../interfaces/http';
import { ServerError } from '../../interfaces/errors';
import { ReadTasks } from '../../interfaces/useCases';
import { Controller } from '../../interfaces/controller';

export class ReadTasksController implements Controller {
  constructor(private readTasks: ReadTasks) {}

  async handle(): Promise<HttpResponse> {
    try {
      const tasks = await this.readTasks.read();

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