import { Router } from "express";
import { expressAdapter } from "../../utils/controller-adapter/controller-adapter";
import { makeCreateTask } from "../../factories/create-task";

export default (router: Router): void => {
  router.post("/", expressAdapter(makeCreateTask()));
}
