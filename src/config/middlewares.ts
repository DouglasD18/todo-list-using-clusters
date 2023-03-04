import { Express } from "express";
import { contentType } from "../middlewares/content-type/content-type";
import { cors } from "../middlewares/cors/cors";

export default (app: Express): void => {
  app.use(contentType);
  app.use(cors)
}