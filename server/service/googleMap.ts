import axios from 'axios';
import { BadRequestException, ErrorException } from '../utils/exception';

const BASE_URL = 'https://maps.googleapis.com/maps/api/';
const SECRET_KEY = useRuntimeConfig().googleMapSecretKey;
const DEFAULT_LANGUAGE = 'th_TH';

type GetAddressSuggestion = {
  search: string,
  language?: string
}

type GetNearbySuggestion = {
  location: Location,
  language?: string
}

type GetGeocode = {
  address: string,
}

type ResponsePredictions = {
  predictions: Prediction[]
}
type Prediction = {
  description: string
  matched_substrings: MatchedSubstring[]
  place_id: string
  reference: string
  structured_formatting: StructuredFormatting
  terms: Term[]
  types: string[]
}
type MatchedSubstring = {
  length: number
  offset: number
}
type StructuredFormatting = {
  main_text: string
  main_text_matched_substrings: MainTextMatchedSubstring[]
  secondary_text: string
}
type MainTextMatchedSubstring = {
  length: number
  offset: number
}
type Term = {
  offset: number
  value: string
}

// ----
export type ResponseNearbySearch = {
  html_attributions: any[]
  next_page_token: string
  results: NearbySearch[]
  status: string
}

export type NearbySearch = {
  business_status: string
  geometry: Geometry
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  photos: Photo[]
  place_id: string
  plus_code: PlusCode
  price_level?: number
  rating: number
  reference: string
  scope: string
  types: string[]
  user_ratings_total: number
  vicinity: string
  opening_hours?: OpeningHours
  permanently_closed?: boolean
}

export type Geometry = {
  location: Location
  viewport: Viewport
}

export type Location = {
  lat: number
  lng: number
}

export type Viewport = {
  northeast: Northeast
  southwest: Southwest
}

export type Northeast = {
  lat: number
  lng: number
}

export type Southwest = {
  lat: number
  lng: number
}

export type Photo = {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}

export type PlusCode = {
  compound_code: string
  global_code: string
}

export type OpeningHours = {
  open_now: boolean
}

// ---
export type ResponseGeocode = {
  results: Array<{
    address_components: Array<{
      long_name: string
      short_name: string
      types: Array<string>
    }>
    formatted_address: string
    geometry: {
      bounds: {
        northeast: {
          lat: number
          lng: number
        }
        southwest: {
          lat: number
          lng: number
        }
      }
      location: {
        lat: number
        lng: number
      }
      location_type: string
      viewport: {
        northeast: {
          lat: number
          lng: number
        }
        southwest: {
          lat: number
          lng: number
        }
      }
    }
    partial_match: boolean
    place_id: string
    types: Array<string>
  }>
  status: string
}


const instance = axios.create({
  baseURL: BASE_URL
})
instance.interceptors.response.use(
  (response) => {
    if (['ZERO_RESULTS', 'OK'].includes(response.data.status) === false) {
      switch (response.data.status) {
        case 'REQUEST_DENIED':
          throw new ErrorException('common/unexpected');
        case 'INVALID_REQUEST':
          throw new BadRequestException('common/validation-failed');
        default:
          throw new ErrorException('common/error');
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getAddressSuggestion = async (params: GetAddressSuggestion): Promise<ResponsePredictions> => {
  const response = await instance.get<ResponsePredictions>(`place/autocomplete/json`, {
    params: {
      language: params.language || DEFAULT_LANGUAGE,
      input: params.search,
      key: SECRET_KEY
    }
  })
  return response.data;
}


export const getGeocode = async (params: GetGeocode): Promise<ResponseGeocode> => {
  const response = await instance.get<ResponseGeocode>(`geocode/json`, {
    params: { address: params.address, key: SECRET_KEY }
  })
  return response.data;
}

export const getNearbySuggestion = async (params: GetNearbySuggestion): Promise<ResponseNearbySearch> => {
  const response = await instance.get<ResponseNearbySearch>(`place/nearbysearch/json`, {
    params: {
      language: params.language || DEFAULT_LANGUAGE,
      location: `${params.location.lat} ${params.location.lng}`,
      radius: 3000,
      type: 'restaurant',
      key: SECRET_KEY
    }
  })

  return response.data;
}