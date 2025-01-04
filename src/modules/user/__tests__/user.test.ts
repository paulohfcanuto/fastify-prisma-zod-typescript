import { PrismaClient } from '@prisma/client';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { cleanTable } from '../../../test/helpers/database.ts';
import { UserService } from '../user.service.ts';

describe('User Module', () => {
  const prisma = new PrismaClient();
  const userService = new UserService(prisma);

  beforeEach(async () => {
    await cleanTable(['users']);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('UserService', () => {
    it('should create a user', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        sex: 'MALE' as const
      };

      const user = await userService.createUser(userData);

      expect(user).toMatchObject({
        firstName: userData.firstName,
        lastName: userData.lastName,
        sex: userData.sex
      });
      expect(user.id).toBeDefined();
      expect(user.dob).toBeInstanceOf(Date);
    });

    it('should list users with pagination', async () => {
      // Create test users
      await Promise.all([
        userService.createUser({
          firstName: 'John',
          lastName: 'Doe',
          dob: '1990-01-01',
          sex: 'MALE'
        }),
        userService.createUser({
          firstName: 'Jane',
          lastName: 'Doe',
          dob: '1991-01-01',
          sex: 'FEMALE'
        })
      ]);

      const result = await userService.getUsers({ page: 1, limit: 10 });

      expect(result.users).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.users[0].id).toBeDefined();
      expect(result.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ firstName: 'John' }),
          expect.objectContaining({ firstName: 'Jane' })
        ])
      );
    });
  });
});
