import { PrismaClient } from '@prisma/client';
import { getUser, requireAuth } from './requireAuth';
const prisma = new PrismaClient();

export default defineEventHandler(
  requireAuth(async (event) => {
    const username = await getUser(event);
    const marker = await readBody(event);
    delete marker.id;
    delete marker.username;
    try {
      return await prisma.marker.create({
        data: {
          title: marker.title,
          username: username,
          description: marker.description,
          icon: marker.icon,
          color: marker.color,
          position: {
            create: marker.position,
          },
        },
      });
    } catch (e: unknown) {
      console.error(e);
    }
  }),
);
