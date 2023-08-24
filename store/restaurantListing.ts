
import { defineStore } from 'pinia';
import { AddressSuggestion, PlaceSuggestion } from 'interface/address';
import axios from 'axios';


type RestaurantListingStore = {
  search: globalThis.Ref<string>,
  zoom: globalThis.Ref<number>,
  center: globalThis.Ref<any>,
  addresses: globalThis.Ref<ResponseListing<AddressSuggestion>>,
  places: globalThis.Ref<ResponseListing<PlaceSuggestion>>,
  getCurrentLocation: () => Promise<void>,
  handleGetPlaces: () => Promise<void>,

  triggerSubmitSearch: () => void,
  handleClickAddress: (params: any) => void
  handleFocusPlace: (place: PlaceSuggestion, focusZoom?: number) => void
}
type ResponseListing<T> = {
  items: T[],
  error?: string,
  loading: boolean
}
/**
 * Note 
 * https://pinia.vuejs.org/core-concepts/#Setup-Stores Object base | function base
 * state : return state object | ref 
 * mutations : directly update state | function
 * actions : method | function
 * getters : get state can mod state before return | computed
 */
const DEFAULT_ZOOM = 15;
export const useRestaurantListingStore = defineStore('restaurantListingStore', (): RestaurantListingStore => {
  const search = ref('')
  const debounceTimeout = ref<ReturnType<typeof setTimeout>>()
  const addresses = ref<ResponseListing<AddressSuggestion>>({ items: [], loading: false })
  const places = ref<ResponseListing<PlaceSuggestion>>({ items: [], loading: false })

  const zoom = ref<number>(DEFAULT_ZOOM)
  const center = ref({ lat: 13.7462411, lng: 100.5298693 })


  function triggerSubmitSearch() {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
    debounceTimeout.value = setTimeout(() => {
      handleSubmitSearch();
    }, 500);
  }

  async function handleSubmitSearch() {
    try {
      if (!search.value) return;
      addresses.value.loading = true;
      addresses.value.items = [];
      const response = await axios.get('/api/address/suggestion', { params: { search: String(search.value) } })
      addresses.value = response.data
    } catch (error) {
      const e = (error as any)
      addresses.value.error = e?.response.data?.message ?? e.message
    } finally {
      addresses.value.loading = false;
    }
  }



  async function handleClickAddress(params: any) {
    search.value = params.id.description;
    /**
     * recently
     */
    await handleGetPlaces();
  }

  async function handleGetPlaces() {
    try {
      places.value.loading = true;
      places.value.items = [];
      const response = await axios.get('/api/address/nearby', { params: { search: String(search.value) } })

      places.value = response.data
      if (response.data?.items?.[0]) handleFocusPlace(response.data?.items?.[0])
    } catch (error) {
      const e = (error as any)
      places.value.error = e?.response.data?.message ?? e.message
    } finally {
      places.value.loading = false;
    }
  }

  function handleFocusPlace(place: PlaceSuggestion, focusZoom = DEFAULT_ZOOM) {
    center.value = place.geometry.location;
    zoom.value = focusZoom;
  }

  async function getCurrentLocation() {
    search.value = 'Bang Sue';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(console.log)
    } else {
    }
  }

  return { search, addresses, places, zoom, center, getCurrentLocation, handleGetPlaces, triggerSubmitSearch, handleClickAddress, handleFocusPlace };
});


