import { z } from 'zod';

const MacroKey = z.object({
  macro_key_index: z.number(),
  input_key: z.string(),
  out_key: z.string().array(),
  intvel_ms: z.string().array(),
});

export const MacroKey;
