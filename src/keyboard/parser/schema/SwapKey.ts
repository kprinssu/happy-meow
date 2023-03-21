import { z } from 'zod';

export const SwapKey = z.object({
  swap_key_index: z.number(),
  input_key: z.string(),
  out_key: z.string(),
});

export type SwapKey = z.infer<typeof SwapKey>;
