import { Router } from "express";
import { makeDeleteTask } from "../../factories/delete-task";
import { expressAdapter } from "../../utils/controller-adapter/controller-adapter";

export default (router: Router): void => {
  router.delete("/", expressAdapter(makeDeleteTask()));
}
