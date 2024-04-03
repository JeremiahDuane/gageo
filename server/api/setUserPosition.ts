import { PrismaClient } from '@prisma/client';
import { getUser, requireAuth } from './requireAuth';
const prisma = new PrismaClient();

export default defineEventHandler(
  requireAuth(async (event) => {
    const username = await getUser(event);
    const position = await readBody(event);

    try {
      const newLocation = await prisma.userLocation.upsert({
        where: {
          username: username,
        },
        update: {
          username: username,
          ...position,
        },
        create: {
          username: username,
          ...position,
        },
      });
      return newLocation;
    } catch (e: unknown) {
      console.error(e);
    }
  }),
);
