export type Location = {
  latitude: number;
  longitude: number;
};

export function isLocation(x: unknown): x is Location {
  return (
    !!x &&
    typeof x === 'object' &&
    !!(x as Location).longitude &&
    !!(x as Location).latitude &&
    typeof (x as Location).latitude === 'number' &&
    typeof (x as Location).longitude === 'number'
  );
}
