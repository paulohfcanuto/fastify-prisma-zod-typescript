import { type PrismaClient } from '@prisma/client';
import { type FastifyInstance } from 'fastify';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupTestModule } from '../../../test/helpers/module.ts';
import supertest from 'supertest';
import UserRoutes from '../user.routes.ts';

describe('User Routes', () => {
  let app: FastifyInstance;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const setup = await setupTestModule({
      tables: ['users'],
      ModuleRoutes: UserRoutes
    });
    app = setup.app;
    prisma = setup.prisma;
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('should create a user', async () => {
    const response = await supertest(app.server).post('/users').send({
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      sex: 'MALE'
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      sex: 'MALE'
    });
    expect(response.body.id).toBeDefined();
    expect(response.body.dob).toBe('1990-01-01');
  });

  it('should list users', async () => {
    // Create a user first
    await supertest(app.server).post('/users').send({
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      sex: 'MALE'
    });

    const response = await supertest(app.server).get('/users').query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta).toMatchObject({
      total: 1,
      page: 1,
      limit: 10,
      pages: 1
    });
  });
});
