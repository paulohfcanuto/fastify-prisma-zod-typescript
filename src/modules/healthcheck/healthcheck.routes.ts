import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { IRoute } from '../../common/interfaces/route.interface';
import { HealthcheckResponseSchema } from './healthcheck.schema';
import { HealthcheckService } from './healthcheck.service';

export default class HealthcheckRoutes implements IRoute {
  private healthcheckService: HealthcheckService;

  constructor(private prisma: PrismaClient) {
    this.healthcheckService = new HealthcheckService(prisma);
  }

  async register(app: FastifyInstance): Promise<void> {
    app.get('/health', {
      schema: {
        response: {
          200: zodToJsonSchema(HealthcheckResponseSchema)
        },
        description: 'Health check endpoint that verifies the API and database status'
      }
    }, async () => {
      return this.healthcheckService.check();
    });
  }
}