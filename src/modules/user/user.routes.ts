import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { createUserSchema, userResponseSchema, paginationQuerySchema } from './user.schema';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { IRoute } from '../../common/interfaces/route.interface';

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