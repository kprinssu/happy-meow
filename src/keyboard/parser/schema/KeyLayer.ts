import { z } from 'zod';

const Layer = z.object({
  layer: z.string().array(),
});

export const KeyLayer = z.object({
  valid: z.coerce.boolean(),
  layer_num: z.number(),
  layer_data: Layer.array(),
});

export type KeyLayerData = z.infer<typeof Layer>;
export type KeyLayer = z.infer<typeof KeyLayer>;
