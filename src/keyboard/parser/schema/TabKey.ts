import { z } from 'zod';

const TabKey = z.object({
  ta_key_index: z.number(),
  key_value: z.string(),
  single_key_out: z.string().array(),
  double_key_out: z.string().array(),
  three_key_out: z.string().array(),
  long_key_out: z.string().array(),
});

export const TabKey;
