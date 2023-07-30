import { HttpStatus } from "../constants/httpStatus.js";
import { Exception } from "./exception.js";

export class NotFoundException extends Exception {
  constructor(title, message) {
    super(title, HttpStatus.NOT_FOUND, message);
  }
}
