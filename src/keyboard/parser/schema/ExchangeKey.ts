import { z } from 'zod';

const ExchangeKey = z.object({
  exchange_index: z.number(),
  input_key: z.string().array(),
  out_key: z.string().array(),
});

export const ExchangeKey;
