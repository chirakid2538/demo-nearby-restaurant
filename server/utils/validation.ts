import Joi from "joi";

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
