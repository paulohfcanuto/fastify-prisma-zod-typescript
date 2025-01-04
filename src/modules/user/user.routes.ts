import { PrismaClient } from '@prisma/client';
import { type FastifyInstance } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { type IRoute } from '../../common/interfaces/route.interface.ts';
import { UserController } from './user.controller.ts';
import { createUserSchema, paginationQuerySchema, userResponseSchema } from './user.schema.ts';
import { UserService } from './user.service.ts';

export default class UserRoutes implements IRoute {
  private controller: UserController;

  constructor(private prisma: PrismaClient) {
    const service = new UserService(prisma);
    this.controller = new UserController(service);
  }

  async register(app: FastifyInstance): Promise<void> {
    app.post(
      '/users',
      {
        schema: {
          body: zodToJsonSchema(createUserSchema),
          response: {
            201: zodToJsonSchema(userResponseSchema)
          }
        }
      },
      this.controller.createUser.bind(this.controller)
    );

    app.get(
      '/users',
      {
        schema: {
          querystring: zodToJsonSchema(paginationQuerySchema)
        }
      },
      this.controller.getUsers.bind(this.controller)
    );
  }
}
