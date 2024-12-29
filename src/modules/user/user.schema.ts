import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dob: z.string().datetime(),
  sex: z.enum(['MALE', 'FEMALE'])
});

export const userResponseSchema = createUserSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const paginationQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10)
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>; 