import { Controller } from "../../interfaces/controller";
import { HttpRequest } from "../../interfaces/http";
import { Request, Response } from "express";

export const expressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    
    const httpResponse = await controller.handle(httpRequest);
    const { statusCode, body } = httpResponse;

    res.status(statusCode).json(body);
  }
}