import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { IRoute } from '../../common/interfaces/route.interface';
import { UserController } from './user.controller';
import { createUserSchema, paginationQuerySchema, userResponseSchema } from './user.schema';
import { UserService } from './user.service';

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
