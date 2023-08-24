import axios from "axios"

const SECRET_KEY = useRuntimeConfig().recaptchaSecretKey;
export const verify = async (token: string) => {
  try {
    if (!token) {
      throw new Error('common/access-denied');
    }
    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      { secret: SECRET_KEY, response: token },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (Boolean(data?.success) === false) {
      throw new Error('common/access-denied');
    }

    return data;
  } catch (error) {
    throw error;
  }
}