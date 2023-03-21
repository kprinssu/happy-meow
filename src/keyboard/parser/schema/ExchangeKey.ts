import { z } from 'zod';

export const ExchangeKey = z.object({
  exchange_index: z.number(),
  input_key: z.string().array(),
  out_key: z.string().array(),
});

export type ExchangeKey = z.infer<typeof ExchangeKey>;
