import { Express } from "express";
import { contentType } from "../middlewares/content-type/content-type";

export default (app: Express): void => {
  app.use(contentType);
}