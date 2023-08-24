<template>
  <ClientOnly fallback-tag="div">
    <template #fallback>
      <v-progress-linear
        style="position: absolute"
        indeterminate
      ></v-progress-linear>
    </template>
    <GoogleMap
      :api-key="config.public.googleMapSecretKey"
      :center="restaurantListingStore.center"
      :zoom="restaurantListingStore.zoom"
      :fullscreen-control="false"
      :map-type-control="false"
      style="width: 100%; height: 100dvh; position: absolute"
    >
      <Marker
        v-for="place in restaurantListingStore.places.items"
        :key="place.placeId"
        :options="{
          position: place.geometry.location
        }"
      >
      </Marker>
    </GoogleMap>
  </ClientOnly>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map';
const config = useRuntimeConfig();

import { useRestaurantListingStore } from '@/store/restaurantListing';
const restaurantListingStore = useRestaurantListingStore();
onMounted(() => {
  restaurantListingStore.getCurrentLocation().then(() => {
    restaurantListingStore.handleGetPlaces();
  });
});
</script>
