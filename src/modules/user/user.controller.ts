import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, PaginationQuery } from './user.schema';
import { UserService } from './user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    const user = await this.userService.createUser(request.body);
    return reply.code(201).send({
      ...user,
      dob: user.dob.toISOString().split('T')[0]
    });
  }

  async getUsers(
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply
  ) {
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