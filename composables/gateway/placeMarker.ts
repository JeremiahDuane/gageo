import type { Marker } from '~/types/Marker';
import { $gateway } from '.';

// Synchronous
export function $placeMarker(marker: Marker) {
  return $gateway('/api/placeMarker', marker);
}
