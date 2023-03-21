import { z } from 'zod';

import { ProductInfo } from './ProductInfo';
import { PageData } from './PageData';
import { ExchangeKey } from './ExchangeKey';
import { TabKey } from './TabKey';
import { FunctionKey } from './FunctionKey';
import { MacroKey } from './MacroKey';
import { SwapKey } from './SwapKey';


export const Cyberboard = z.object({
  product_info: ProductInfo,
  page_num: z.number(),
  page_data: PageData.array(),
  exchange_num: z.number(),
  exchange_key: ExchangeKey.array(),
  tab_key_num: z.number(),
  tab_key: TabKey.array(),
  fn_key_num: z.number(),
  fn_key: FunctionKey.array(),
  macro_key_num: z.number(),
  macro_key: MacroKey.array(),
  swap_key_num: z.number(),
  swap_key: SwapKey.array(),
  key_layer
});

export type Cyberboard = z.infer<typeof Cyberboard>;
