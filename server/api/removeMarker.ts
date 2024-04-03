import { PrismaClient } from '@prisma/client';
import { getUser, requireAuth } from './requireAuth';
const prisma = new PrismaClient();

export default defineEventHandler(
  requireAuth(async (event) => {
    const marker = await readBody(event);
    try {
      const locationResponse = await prisma.location.delete({
        where: {
          markerId: marker.id,
        },
      });
      const markerResponse = await prisma.marker.delete({
        where: {
          id: marker.id,
        },
      });

      return [locationResponse, markerResponse];
    } catch (e: unknown) {
      console.error(e);
    }
  }),
);
