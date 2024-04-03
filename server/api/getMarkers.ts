import { PrismaClient } from '@prisma/client';
import { requireAuth } from './requireAuth';
const prisma = new PrismaClient();

export default defineEventHandler(
  requireAuth(async (event) => {
    try {
      const response = await prisma.marker.findMany({
        where: {
          position: {
            isNot: null,
          },
        },
        include: {
          position: true,
        },
      });
      return response;
    } catch (e: unknown) {
      console.error(e);
    }
  }),
);
