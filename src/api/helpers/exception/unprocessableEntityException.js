import { HttpStatus } from "../constants/httpStatus.js";
import { Exception } from "./exception.js";

export class UnprocessableEntityException extends Exception {
  constructor(title, message) {
    super(title, HttpStatus.UNPROCESSABLE_ENTITY, message);
  }
}
