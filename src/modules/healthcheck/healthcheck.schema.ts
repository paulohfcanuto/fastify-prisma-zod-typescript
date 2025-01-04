import { z } from 'zod';

export const HealthcheckResponseSchema = z.object({
  status: z.string(),
  version: z.string(),
  apiVersion: z.string(),
  timestamp: z.string(),
  database: z.string(),
  error: z.string().nullable().optional(),
});

export type HealthcheckResponse = z.infer<typeof HealthcheckResponseSchema>;