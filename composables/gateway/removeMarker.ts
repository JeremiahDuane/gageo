import type { Marker } from '~/types/Marker';
import { $gateway } from '.';

// Synchronous
export function $removeMarker(marker: Marker) {
  return $gateway('/api/removeMarker', marker);
}
