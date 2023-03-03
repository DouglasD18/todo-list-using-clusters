import { ValidateBody } from "../../interfaces/validate-body";

export class ValidateBodyAdapter implements ValidateBody {
  isValid(body: any): string | boolean {
    const requiredFields = ["name", "description", "isDone"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return field;
      }
    }

    return true;
  }
}
