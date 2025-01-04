import { PrismaClient } from '@prisma/client';
import { VERSION } from '../../common/config/version.ts';
import { type HealthcheckResponse } from './healthcheck.schema.ts';

export class HealthcheckService {
  constructor(private prisma: PrismaClient) {}

  async check(): Promise<HealthcheckResponse> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'healthy',
        version: VERSION.number,
        apiVersion: VERSION.apiVersion,
        timestamp: new Date().toISOString(),
        database: 'connected'
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        version: VERSION.number,
        apiVersion: VERSION.apiVersion,
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
