import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance, fastify } from 'fastify';
import { IRoute } from '../../common/interfaces/route.interface';
import { cleanTable } from './database';

interface SetupModuleOptions {
  tables: string[];
  ModuleRoutes: new (prisma: PrismaClient) => IRoute;
}

export async function setupTestModule(options: SetupModuleOptions): Promise<{
  app: FastifyInstance;
  prisma: PrismaClient;
}> {
  const prisma = new PrismaClient();
  await cleanTable(options.tables);

  const app = fastify({
    logger: false
  });

  await app.register(cors, {
    origin: true,
    credentials: true
  });

  const moduleRoutes = new options.ModuleRoutes(prisma);
  await moduleRoutes.register(app);
  await app.ready();

  return { app, prisma };
}
