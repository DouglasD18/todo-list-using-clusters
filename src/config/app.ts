import express from "express";
import setupMiddlewares from "./middlewares";
import setupRouter from "./route";

const app = express();

app.use(express.json());
setupMiddlewares(app);
setupRouter(app);

export default app;
