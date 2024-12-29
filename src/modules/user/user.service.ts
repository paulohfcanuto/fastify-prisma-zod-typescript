import { PrismaClient, User } from '@prisma/client';
import { CreateUserInput, PaginationQuery } from './user.schema';

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data
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