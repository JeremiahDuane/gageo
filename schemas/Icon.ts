export enum Icon {
  BEE_BOX = 'BEE_BOX',
  BEE_HIVE = 'BEE_HIVE',
  CAMP_GROUND = 'CAMP_GROUND',
  HOMESTEAD = 'HOMESTEAD',
  OFFICE = 'OFFICE',
  PIN = 'PIN',
  WALL_TENT = 'WALL_TENT',
  WATER = 'WATER',
  WELL = 'WELL',
  // Nav
  USER = 'USER',
  PERSON = 'PERSON',
  REMOVE = 'REMOVE',
  LOCATION = 'LOCATION',
  COMPASS = 'COMPASS',
}

export const IconOptions = [
  Icon.BEE_BOX,
  Icon.BEE_HIVE,
  Icon.CAMP_GROUND,
  Icon.HOMESTEAD,
  Icon.OFFICE,
  Icon.WALL_TENT,
  Icon.WATER,
  Icon.WELL,
  Icon.PIN,
];

export const parseIcon = (icon: Icon) => {
  return icon
    .toLowerCase()
    .split('_')
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1, i.length))
    .join(' ');
};
