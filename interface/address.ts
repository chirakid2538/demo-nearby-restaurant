export type AddressSuggestion = {
  addressId: string,
  description: string,
}

export type PlaceSuggestion = {
  placeId: string,
  geometry: { location: { lat: number, lng: number } },
  icon: string,
  iconBackgroundColor: string,
  displayName: string,
  vicinity: string,
  rating: number,
  userRatingsTotal: number,
}
