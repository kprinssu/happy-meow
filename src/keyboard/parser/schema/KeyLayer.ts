import { z } from 'zod';

export const KeyLayer = z.object({
  valid: z.boolean(),
  layer0: z.string().array().optional(),
  layer1: z.string().array().optional(),
  layer2: z.string().array().optional(),
});

export type KeyLayer = z.infer<typeof KeyLayer>;
