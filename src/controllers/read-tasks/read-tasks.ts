import { HttpResponse } from '../../interfaces/http';
import { ServerError } from '../../interfaces/errors';
import { ReadTasks } from '../../interfaces/useCases';

export class ReadTasksController {
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