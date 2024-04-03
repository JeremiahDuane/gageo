import { z } from 'zod';
import { Icon } from '~/schemas/Icon';
import { LocationSchema } from './Location';

export const MarkerSchema = z.object({
  id: z.string(),
  username: z.string(),
  title: z.string(),
  color: z.string().optional(),
  description: z.string().optional(),
  icon: z.nativeEnum(Icon).optional(),
  position: LocationSchema,
});

export type MarkerSchemaType = z.output<typeof MarkerSchema>;
