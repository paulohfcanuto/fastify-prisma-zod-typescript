import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dob: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  sex: z.enum(['MALE', 'FEMALE'])
});

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date(),
  sex: z.enum(['MALE', 'FEMALE']),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const paginationQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10)
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;