<script setup lang="ts">
import { GoogleMap, CustomMarker } from 'vue3-google-map';
import { useGeolocation } from '@vueuse/core';
import { useGetMarkers, useGetUserMarkers } from '~/composables/gateway/getMarkers';
import { $setUserPosition } from '@gateway/setUserPosition';

const config = useRuntimeConfig();
const { coords, locatedAt } = useGeolocation();

const [markers, errorMarkers] = useGetMarkers();
const [users, errorUsers] = useGetUserMarkers();

const center = ref({ lat: 0, lng: 0 });
const lastSetPosition = ref({ lat: 0, lng: 0 });

const parseLatLng = (location: GeolocationCoordinates) => {
  return { lat: location.latitude, lng: location.longitude };
};
const surpassedDistanceThreshold = (searched: any, current: any) => {
  if (!searched || !searched?.value) return true;
  if (!current || !current?.value) return true;

  const s = searched.value;
  const c = current.value;

  const latDiff = c.latitude - s.latitude;
  const lngDiff = c.longitude - s.longitude;

  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) > 0.001;
};

watch(locatedAt, async (newValue, oldValue) => {
  center.value = parseLatLng(coords.value);
  if (oldValue === null || surpassedDistanceThreshold(lastSetPosition, coords)) {
    $setUserPosition({ latitude: coords.value.latitude, longitude: coords.value.longitude });
  }
});
</script>

<template>
  <GoogleMap
    class="h-screen w-full"
    :apiKey="config.public.mapsApiKey"
    :center="center"
    :zoom="17"
    :streetViewControl="false"
  >
    <CustomMarker key="current-user" :options="{ position: center, anchorPoint: 'CENTER' }">
      <IUser />
    </CustomMarker>
    <MapMarker v-for="marker of markers" :key="marker.getId()" :marker="marker" />
    <MapMarker v-for="marker of users" :key="marker.getId()" :marker="marker" />
  </GoogleMap>
</template>
