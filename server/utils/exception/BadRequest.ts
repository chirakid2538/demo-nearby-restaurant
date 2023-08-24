import { BaseException } from "./Base";

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super(message)
    this.name = "BadRequestException";
  }
}