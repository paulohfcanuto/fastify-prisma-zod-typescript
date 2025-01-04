import { type FastifyInstance } from 'fastify';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupTestModule } from '../../../test/helpers/module.ts';
import supertest from 'supertest';
import HealthcheckRoutes from '../healthcheck.routes.ts';

describe('Healthcheck Routes', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    const setup = await setupTestModule({
      ModuleRoutes: HealthcheckRoutes,
      tables: []
    });
    app = setup.app;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 and health status', async () => {
    const response = await supertest(app.server).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'healthy',
      timestamp: expect.any(String),
      version: expect.any(String),
      apiVersion: expect.any(String),
      database: expect.any(String)
    });
  });

  it('should return JSON content type', async () => {
    const response = await supertest(app.server).get('/health');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('should return valid timestamp in response', async () => {
    const response = await supertest(app.server).get('/health');
    const timestamp = new Date(response.body.timestamp);

    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).not.toBeNaN();
  });
});
