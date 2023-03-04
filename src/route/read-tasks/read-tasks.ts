import { Router } from "express";
import { makeReadTasksController } from "../../factories/read-tasks";
import { expressAdapter } from "../../utils/controller-adapter/controller-adapter";

export default (router: Router): void => {
  router.get("/", expressAdapter(makeReadTasksController()));
}