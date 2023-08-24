import { BaseException } from "./Base";

export class ErrorException extends BaseException {
  constructor(message: string) {
    super(message)
    this.name = "ErrorException";
  }
}