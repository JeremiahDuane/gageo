import { PrismaClient } from '@prisma/client';
import { getServerSession } from '#auth';
const prisma = new PrismaClient();

export function requireAuth(func: (event: any) => Promise<any>) {
  return async (event: any) => {
    const session = await getServerSession(event);
    if (!session?.user?.email) {
      return { status: 'unauthenticated' };
    }
    const user = {
      username: session.user.email,
      name: session.user.name ?? undefined,
    };

    try {
      await prisma.user.upsert({
        where: {
          username: session.user.email,
        },
        update: user,
        create: user,
      });
      return func(event);
    } catch {
      return { status: 'unknown' };
    }
  };
}

export async function getUser(event: any) {
  const session = await getServerSession(event);
  if (!session?.user?.email) {
    return undefined;
  } else {
    return session.user.email;
  }
}
