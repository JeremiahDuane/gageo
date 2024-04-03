import type { Icon } from '~/schemas/Icon';
import type { Location } from '~/types/Location';

export type Marker = {
  id: string;
  username: string;
  title: string;
  position: Location;
  icon?: Icon;
  description?: string;
  color?: string;
};
