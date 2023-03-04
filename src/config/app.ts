import express from "express";
import setupMiddlewares from "./middlewares";

const app = express();

app.use(express.json());
setupMiddlewares(app);

export default app;
