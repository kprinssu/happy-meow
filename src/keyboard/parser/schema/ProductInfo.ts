import { z } from 'zod';

const ProductInfo = z.object({
  product_info_addr: z.string(),
  product_id: z.string(),
});

export const ProductInfo;
