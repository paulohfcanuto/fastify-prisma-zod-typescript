import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { HealthcheckService } from '../healthcheck.service.ts';
import { PrismaClient } from '@prisma/client';

describe('Healthcheck Module', () => {
  const prisma = new PrismaClient();
  const healthcheckService = new HealthcheckService(prisma);

  describe('HealthcheckService', () => {
    afterAll(async () => {
      await prisma.$disconnect();
    });

    beforeEach(async () => {
      await prisma.$connect();
    });

    it('should return health status with all required fields', async () => {
      const result = await healthcheckService.check();

      expect(result).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
        version: expect.any(String),
        apiVersion: expect.any(String),
        database: expect.any(String)
      });
    });

    it('should return valid timestamp format', async () => {
      const result = await healthcheckService.check();
      const timestamp = new Date(result.timestamp);

      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    it('should return non-empty version string', async () => {
      const result = await healthcheckService.check();
      expect(result.version).toBeTruthy();
      expect(typeof result.version).toBe('string');
    });

    it('should handle database error', async () => {
      // Mock the database query to throw an error
      const testError = new Error('Database error');
      vi.spyOn(prisma, '$queryRaw').mockRejectedValueOnce(testError);

      const result = await healthcheckService.check();

      expect(result).toMatchObject({
        status: 'unhealthy',
        database: 'disconnected',
        error: 'Database error',
        timestamp: expect.any(String),
        version: expect.any(String),
        apiVersion: expect.any(String)
      });
    });

    it('should handle non-Error objects', async () => {
      // Mock the database query to throw a non-Error object
      vi.spyOn(prisma, '$queryRaw').mockRejectedValueOnce('Some string error');

      const result = await healthcheckService.check();

      expect(result).toMatchObject({
        status: 'unhealthy',
        database: 'disconnected',
        error: 'Unknown error',
        timestamp: expect.any(String),
        version: expect.any(String),
        apiVersion: expect.any(String)
      });
    });

    it('should reconnect after database error', async () => {
      const result = await healthcheckService.check();

      expect(result).toMatchObject({
        status: 'healthy',
        database: 'connected'
      });
    });
  });
});
