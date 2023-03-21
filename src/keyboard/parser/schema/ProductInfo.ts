import { z } from 'zod';

export const ProductInfo = z.object({
  product_info_addr: z.string(),
  product_id: z.string(),
});

export type ProductInfo = z.infer<typeof ProductInfo>;
