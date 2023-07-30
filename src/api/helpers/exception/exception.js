import { HttpStatus } from "../constants/httpStatus.js";

export class Exception extends Error {
  constructor(title, httpStatus = HttpStatus.UNPROCESSABLE_ENTITY, message) {
    super(title);
    this.title = title;
    this.statusCode = httpStatus;
    this.message = message;
  }
}
