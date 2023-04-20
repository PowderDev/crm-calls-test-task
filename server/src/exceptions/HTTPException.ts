export default class HTTPException extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.status = status
  }

  static BadRequest(message: string) {
    return new HTTPException(400, message)
  }
}
