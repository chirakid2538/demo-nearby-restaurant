import md5 from 'md5';
import Joi from 'joi';
import { AddressSuggestion } from "../../../interface/address";
import { getAddressSuggestion } from "../../service/googleMap";
import { handleError } from "../../utils/exception/utils";
import { validate } from '../../utils/validation';

/**
 * https://unstorage.unjs.io/drivers/redis
 */
const CACHE_TTL = 60 * 5;
const schema = Joi.object({
  search: Joi.string()
    .required()
})
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  await validate(schema, query)

  const search = String(query.search).trim()
  const cacheKey = `addressed-suggestion-${md5(search)}`;
  try {
    const items = await useStorage('redis').getItem(cacheKey);
    if (items) return { items, cached: true }
  } catch (error) {
  }

  try {
    const { predictions } = await getAddressSuggestion({ search })
    const items: AddressSuggestion[] = predictions.map(predict => {
      return { addressId: predict.place_id, description: predict.description }
    })

    await useStorage('redis').setItem(cacheKey, items, { ttl: CACHE_TTL });
    return { items }
  } catch (error) {
    handleError(error)
  }
})
