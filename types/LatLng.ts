export type LatLng = {
  lat: number;
  lng: number;
};

export function isLatLng(x: unknown): x is LatLng {
  return (
    !!x &&
    typeof x === 'object' &&
    !!(x as LatLng).lng &&
    !!(x as LatLng).lat &&
    typeof (x as LatLng).lat === 'number' &&
    typeof (x as LatLng).lng === 'number'
  );
}
