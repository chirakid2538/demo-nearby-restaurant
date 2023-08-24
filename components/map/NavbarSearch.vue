<template>
  <div class="card-navbar-search">
    <v-menu v-model="menu" :close-on-content-click="true">
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          class="input-autocomplete-search"
          variant="solo"
          :loading="restaurantListingStore.addresses.loading"
          v-model="restaurantListingStore.search"
          label="ค้นหาใน Google map"
          hide-details
        >
        </v-text-field>
      </template>

      <v-card style="margin-top: 10px" max-width="350px">
        <v-list
          lines="one"
          v-show="restaurantListingStore.addresses.items.length > 0"
          @click:select="restaurantListingStore.handleClickAddress"
        >
          <v-list-item
            v-for="address in restaurantListingStore.addresses.items"
            :key="address.addressId"
            :title="address.description"
            :value="address"
          ></v-list-item>
        </v-list>

        <div
          v-show="
            restaurantListingStore.addresses.items.length < 1 &&
            restaurantListingStore.addresses.loading === false
          "
          class="px-2 py-2"
        >
          <p class="text-grey-darken-1 text-caption">
            ไม่พบผลลัพธ์การค้นหาพื้นที่ใกล้เคียง ลองพิมพ์ใหม่อีกครั้ง
          </p>
          <p
            v-show="Boolean(restaurantListingStore.addresses.error)"
            class="text-red-darken-1 text-caption"
          >
            {{ restaurantListingStore.addresses.error }}
          </p>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped lang="scss">
.card-navbar-search {
  margin: 20px 20px 0px 20px;
  .input-autocomplete-search {
    max-width: 350px;
  }
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRestaurantListingStore } from '@/store/restaurantListing';
const restaurantListingStore = useRestaurantListingStore();

const menu = ref(false);
const { search } = storeToRefs(restaurantListingStore);

watch(search, async () => {
  await restaurantListingStore.triggerSubmitSearch();
});
</script>
