import { z } from 'zod';

const Color = z.object({
  default: z.coerce.boolean(),
  back_rgb: z.string(),
  rgb: z.string(),
});

const WordPage = z.object({
  valid: z.coerce.boolean(),
  word_len: z.number(),
  unicode: z.string().array(),
});

const FrameData = z.object({
  frame_index: z.coerce.number(),
  frame_RGB: z.string().array(),
});

const Frames = z.object({
  valid: z.coerce.boolean(),
  frame_num: z.number(),
  frame_data: FrameData.array(),
});

const KeyframeData = z.object({
  frame_index: z.number(),
  frame_RGB: z.string().array(),
});

const Keyframe = z.object({
  valid: z.coerce.boolean(),
  frame_num: z.number(),
  frame_data: KeyframeData.array(),
});

export const PageData = z.object({
  valid: z.coerce.boolean(),
  page_index: z.number(),
  lightness: z.number(),
  speed_ms: z.number(),
  color: Color,
  word_page: WordPage,
  frames: Frames,
  keyframes: Keyframe.optional(),
});

export type PageData = z.infer<typeof PageData>;
export type Color = z.infer<typeof Color>;
export type FrameData = z.infer<typeof FrameData>;
