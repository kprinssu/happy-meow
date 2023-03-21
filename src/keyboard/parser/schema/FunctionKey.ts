import { z } from 'zod';

export const FunctionKey = z.object({
  fn_key_index: z.number(),
  input_key: z.string(),
  out_key: z.string(),
});

export type FunctionKey = z.infer<typeof FunctionKey>;
