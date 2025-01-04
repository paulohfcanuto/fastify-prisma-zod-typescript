import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type CreateUserInput, type PaginationQuery } from './user.schema.ts';
import { UserService } from './user.service.ts';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const user = await this.userService.createUser(request.body);
    return reply.code(201).send({
      ...user,
      dob: user.dob.toISOString().split('T')[0]
    });
  }

  async getUsers(
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const result = await this.userService.getUsers(request.query);
    return reply.send({
      data: result.users.map(user => ({
        ...user,
        dob: user.dob.toISOString().split('T')[0]
      })),
      meta: {
        total: result.total,
        page: request.query.page,
        limit: request.query.limit,
        pages: Math.ceil(result.total / request.query.limit)
      }
    });
  }
}
