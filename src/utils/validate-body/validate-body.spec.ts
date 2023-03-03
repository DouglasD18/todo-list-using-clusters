import { ValidateBodyAdapter } from "./validaty-body";

const name = "any_name";
const description = "any_description";
const isDone = true;

describe("ValidateBody Adapter", () => {
  it("Should return name if name is no provided", () => {
    const sut = new ValidateBodyAdapter();

    const isValid = sut.isValid({ description, isDone });

    expect(isValid).toBe("name");
  })

  it("Should return description if description is no provided", () => {
    const sut = new ValidateBodyAdapter();

    const isValid = sut.isValid({ name, isDone });

    expect(isValid).toBe("description");
  })

  it("Should return isDone if isDone is no provided", () => {
    const sut = new ValidateBodyAdapter();

    const isValid = sut.isValid({ name, description });

    expect(isValid).toBe("isDone");
  })

  it("Should return true on success", () => {
    const sut = new ValidateBodyAdapter();

    const isValid = sut.isValid({ name, description, isDone });

    expect(isValid).toBe(true);
  })
})