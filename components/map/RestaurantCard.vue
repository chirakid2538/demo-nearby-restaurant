<template>
  <v-card class="restaurant-card">
    <v-card-item>
      <v-card-title>{{ place.displayName }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="place.rating"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          {{ place.rating || '' }} ({{ place.userRatingsTotal || 0 }})
        </div>
      </v-row>

      <div class="mt-5">
        {{ place.vicinity }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.restaurant-card {
  flex: 1;
  height: inherit;
  width: 240px;
  height: 140px;
}
</style>

<script setup>
const props = defineProps(['place']);
</script>
