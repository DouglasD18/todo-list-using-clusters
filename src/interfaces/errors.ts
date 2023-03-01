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

export class NotFoundError extends Error {
  constructor(param: string) {
    super(`Not found: ${param}`)
    this.name = "NotFoundError"
  }
}