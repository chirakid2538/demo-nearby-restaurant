<script setup>
import NavbarSearch from '@/components/map/NavbarSearch.vue';
import RestaurantListing from '@/components/map/RestaurantListing.vue';
import VisualMap from '@/components/map/VisualMap.vue';
</script>

<template>
  <NuxtLayout>
    <VisualMap></VisualMap>
    <div
      style="
        height: 100dvh;
        background-color: ghostwhite;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <NavbarSearch></NavbarSearch>
      <div style="margin: 0px 20px 20px 20px">
        <RestaurantListing></RestaurantListing>
      </div>
    </div>
  </NuxtLayout>
</template>
