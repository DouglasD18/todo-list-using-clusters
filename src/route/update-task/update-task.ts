import { Router } from "express";
import { makeUpdateTask } from "../../factories/update-task";
import { expressAdapter } from "../../utils/controller-adapter/controller-adapter";

export default (router: Router): void => {
  router.put("/", expressAdapter(makeUpdateTask()));
}