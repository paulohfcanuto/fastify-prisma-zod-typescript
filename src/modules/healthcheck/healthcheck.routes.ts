import { type PrismaClient } from '@prisma/client';
import { type FastifyInstance } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { type IRoute } from '../../common/interfaces/route.interface.ts';
import { HealthcheckService } from './healthcheck.service.ts';
import { HealthcheckResponseSchema } from './healthcheck.schema.ts';

export default class HealthcheckRoutes implements IRoute {
  private healthcheckService: HealthcheckService;

  constructor(private prisma: PrismaClient) {
    this.healthcheckService = new HealthcheckService(prisma);
  }

  async register(app: FastifyInstance): Promise<void> {
    app.get(
      '/health',
      {
        schema: {
          response: {
            200: zodToJsonSchema(HealthcheckResponseSchema)
          },
          description: 'Health check endpoint that verifies the API and database status'
        }
      },
      async () => {
        return this.healthcheckService.check();
      }
    );
  }
}
