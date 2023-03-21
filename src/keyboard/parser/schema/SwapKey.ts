import { z } from 'zod';

const SwapKey = z.object({
  swap_key_index: z.number(),
  input_key: z.string(),
  out_key: z.string(),
});

export const SwapKey;
