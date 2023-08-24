import { BadRequestException } from "./BadRequest";
import { BaseException } from "./Base";

export const handleError = (error: any) => {
  if (error instanceof BaseException) {
    switch (true) {
      case error instanceof BadRequestException:
        throw createError({ statusCode: 400, statusMessage: error.message })
      default:
        throw createError({ statusCode: 500, statusMessage: error.message })
    }
  }

  throw createError({ statusCode: 500, statusMessage: error.message })
}