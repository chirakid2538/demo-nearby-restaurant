import md5 from 'md5';
import Joi from 'joi';
import { PlaceSuggestion } from "../../../interface/address";
import { Location, getGeocode, getNearbySuggestion } from "../../service/googleMap";
import { handleError } from "../../utils/exception/utils";


/**
 * https://unstorage.unjs.io/drivers/redis
 */
const CACHE_TTL = 60 * 5;
const schema = Joi.object({
  lat: Joi.when('search', {
    is: Joi.exist(), otherwise: Joi.number().required(),
  }),
  lng: Joi.when('search', {
    is: Joi.exist(), otherwise: Joi.number().required(),
  }),
  search: Joi.string()
})
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  await validate(schema, query)
  const cacheKey = `nearby-${md5(JSON.stringify(query))}`;
  try {
    const items = await useStorage('redis').getItem(cacheKey);
    if (items) return { items, cached: true }
  } catch (error) {
  }

  const params: any = {}
  try {
    if (query.location) {
      params.location = query.location;
    } else {
      const search = String(query.search).trim()
      const geocode = await getGeocode({ address: search })
      if (geocode.results.length < 1) {
        throw new BadRequestException('common/geocoder-failed');
      }
      params.location = geocode.results.at(0)?.geometry.location as Location
    }
  } catch (error) {
    handleError(error)
  }

  try {
    const { results } = await getNearbySuggestion(params)
    const items: PlaceSuggestion[] = results.map(result => {
      return {
        placeId: result.place_id,
        geometry: { location: result.geometry.location },
        icon: result.icon,
        iconBackgroundColor: result.icon_background_color,
        displayName: result.name,
        vicinity: result.vicinity,
        rating: result.rating,
        userRatingsTotal: result.user_ratings_total,
      }
    })
    await useStorage('redis').setItem(cacheKey, items, { ttl: CACHE_TTL });
    return { items }
  } catch (error) {
    handleError(error)
  }
})
