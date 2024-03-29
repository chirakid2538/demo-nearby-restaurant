import { useRestaurantListingStore } from '../store/restaurantListing';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

describe('restaurant listing store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('init places store values', () => {
    const store = useRestaurantListingStore();
    expect(store.places).toMatchObject({ loading: false, items: [] });
  });

  test('init addresses store values', () => {
    const store = useRestaurantListingStore();
    expect(store.addresses).toMatchObject({ loading: false, items: [] });
  });

  test('default search keyword', () => {
    const store = useRestaurantListingStore();
    expect(store.search).toMatchObject('');
    store.getCurrentLocation();
    expect(store.search).toMatchObject('Bang Sue');
  });

  test('get address autocomplete [access-denied]', async () => {
    const store = useRestaurantListingStore();
    store.getCurrentLocation();
    expect(store.search).toMatchObject('Bang Sue');
    await store.handleSubmitSearch();
    expect(store.addresses.error).toMatchObject('common/access-denied');
  });

  test('get places [access-denied]', async () => {
    const store = useRestaurantListingStore();
    store.getCurrentLocation();
    await store.handleGetPlaces();
    expect(store.places.error).toMatchObject('common/access-denied');
  });
});
