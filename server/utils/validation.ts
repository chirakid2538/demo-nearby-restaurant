import Joi from "joi";
import { verify } from "../service/receptcha";

const responseValidateFailed = ({ error }: any) => {
  return {
    message: error.message,
    errors: (error.details as any[]).reduce(
      (prev, { path, message }) => ({ ...prev, [path.join('.')]: [message] }),
      {},
    ),
  };
};


export const validate = async (schema: Joi.ObjectSchema<any>, params: any) => {
  try {
    const value = await schema.validateAsync(params, { abortEarly: false });
    return value;
  } catch (error) {
    if ((error as Error).name == 'ValidationError') {
      const _ = responseValidateFailed({ error })
      throw createError({ statusCode: 400, statusMessage: 'common/validation-failed', data: { errors: _.errors } })
    }
    throw createError({ statusCode: 500, statusMessage: 'common/validation-failed' })
  }
};

export const validateRecaptcha = async (event: any) => {
  try {
    if (Boolean(event.headers.get('x-bypass'))) return;
    const token = event.headers.get('x-recaptcha') ?? ''
    await verify(token);
  } catch (error) {
    throw createError({ status: 400, statusMessage: (error as any).message })
  }
};