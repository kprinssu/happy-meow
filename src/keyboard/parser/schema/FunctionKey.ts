import { z } from 'zod';

const FunctionKey = z.object({
  fn_key_index: z.number(),
  input_key: z.string(),
  out_key: z.string(),
});

export const FunctionKey;
