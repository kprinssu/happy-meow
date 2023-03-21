import { z } from 'zod';

const KeyLayer = z.object({
  valid: z.boolean(),
  layer0: z.string().array(),
  layer1: z.string().array(),
  layer2: z.string().array(),
});

export const KeyLayer;
