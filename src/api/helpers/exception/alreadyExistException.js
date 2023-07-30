import { HttpStatus } from "../constants/httpStatus.js";
import { Exception } from "./exception.js";

export class AlreadyExistException extends Exception {
  constructor(title, message) {
    super(title, HttpStatus.CONFLICT, message);
  }
}
