import type { NewMarker } from '~/types/Marker';
import { $gateway } from '.';

// Synchronous
export function $placeMarker(marker: NewMarker) {
  return $gateway('/api/placeMarker', marker);
}
