<template>
  <div>
    <Swiper
      :space-between="30"
      :slides-per-view="1"
      :centered-slides="true"
      :grab-cursor="true"
      :breakpoints="{
        1500: {
          slidesPerView: 6
        },
        1200: {
          slidesPerView: 5
        },
        992: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        600: {
          slidesPerView: 2
        }
      }"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
      @slideChange="onSlideChange"
    >
      <SwiperSlide
        v-for="(place, idx) in restaurantListingStore.places.items"
        :key="idx"
        @click="() => restaurantListingStore.handleFocusPlace(place, 18)"
      >
        <RestaurantCard :place="place"></RestaurantCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
  .swiper-cards {
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-size: 4rem;
      margin: 10px 0px;
      border-radius: 6px;
    }
  }
}
</style>

<script setup lang="ts">
import { useRestaurantListingStore } from '@/store/restaurantListing';
import RestaurantCard from '@/components/map/RestaurantCard.vue';
const restaurantListingStore = useRestaurantListingStore();

const activeIndex = ref(0);
function onSlideChange(swiper: any) {
  activeIndex.value = swiper.realIndex ?? 0;
  const place = restaurantListingStore.places?.items?.[activeIndex.value];
  if (!place) return;
  restaurantListingStore.handleFocusPlace(place, 18);
}
</script>
