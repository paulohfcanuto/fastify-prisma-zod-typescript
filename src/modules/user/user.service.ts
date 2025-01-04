import { type PrismaClient, type User } from '@prisma/client';
import { type CreateUserInput, type PaginationQuery } from './user.schema.ts';

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: new Date(data.dob),
        sex: data.sex
      }
    });
  }

  async getUsers(query: PaginationQuery): Promise<{ users: User[]; total: number }> {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.user.count()
    ]);

    return {
      users,
      total
    };
  }
}
