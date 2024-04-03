import { $gateway, useGateway } from '.';
import { useState } from '#imports';
import { Marker } from '~/classes/Marker';
import type { Marker as MarkerPrisma, User as UserPrisma, Location as LocationPrisma } from '@prisma/client';
import { Icon } from '~/schemas/Icon';

type MarkerWithLocation = MarkerPrisma & { position: LocationPrisma };
type UserWithLocation = UserPrisma & { position: LocationPrisma };

function parseUserMarker(m: UserWithLocation): Marker {
  return new Marker({
    id: '',
    title: m.name ?? 'Unknown User',
    username: m.username,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    icon: Icon.PERSON,
    description: undefined,
    position: {
      latitude: parseFloat(`${m.position?.latitude}`),
      longitude: parseFloat(`${m.position?.longitude}`),
    },
  });
}

function parseMarker(m: MarkerWithLocation): Marker {
  return new Marker({
    id: m.id,
    title: m.title,
    username: m.username,
    color: m.color ?? undefined,
    icon: Object.values(Icon).find((i) => i == m.icon),
    description: m.description ?? undefined,
    position: {
      latitude: parseFloat(`${m.position?.latitude}`),
      longitude: parseFloat(`${m.position?.longitude}`),
    },
  });
}

// Synchronous
export function useGetMarkers() {
  const [ref, error] = useGateway('/api/getMarkers');
  const state = useState<Marker[]>('markers');
  state.value = ref.value?.map(parseMarker);
  watch(ref, () => (state.value = ref?.value?.map(parseMarker)));
  return [state, error];
}

export function useGetUserMarkers() {
  const [ref, error] = useGateway('/api/getUserMarkers');
  const state = useState<Marker[]>('users');
  state.value = ref.value?.map(parseUserMarker);
  watch(ref, () => (state.value = ref?.value?.map(parseUserMarker)));
  return [state, error];
}
