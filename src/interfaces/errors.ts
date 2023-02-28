export class ServerError extends Error {
  constructor() {
    super(`Internal Server Error`)
    this.name = "ServerError"
  }
}

export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing param: ${param}`)
    this.name = "MissingParamError"
  }
}