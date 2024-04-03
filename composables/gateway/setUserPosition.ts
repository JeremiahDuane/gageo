import { $gateway } from '.';
import type { Location } from '~/types/Location';

// Synchronous
export function $setUserPosition(position: Location) {
  return $gateway('/api/setUserPosition', position);
}
