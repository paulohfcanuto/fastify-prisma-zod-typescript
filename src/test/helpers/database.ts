import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cleanTable(tables: string[]): Promise<void> {
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
  }
}

export { prisma };
