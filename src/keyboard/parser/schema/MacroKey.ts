import { z } from 'zod';

export const MacroKey = z.object({
  macro_key_index: z.number(),
  input_key: z.string(),
  out_key: z.string().array(),
  intvel_ms: z.string().array(),
});

export type MacroKey = z.infer<typeof MacroKey>;
