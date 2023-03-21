import { z } from 'zod';

const Color = z.object({
  default: z.boolean(),
  back_rgb: z.string(),
  rgb: z.string(),
});

const WordPage = z.object({
  valid: z.boolean(),
  word_len: z.number(),
  unicode: z.string().array(),
});

const FrameData = z.object({
  frame_index: z.number(),
  frame_rgb: z.string().array(),
});

const Frames = z.object({
  valid: z.boolean(),
  frame_num: z.number(),
  frame_data: FrameData.array(),
});

const KeyframeData = z.object({
  frame_index: z.number(),
  frame_rgb: z.string(),
});

const Keyframe = z.object({
  valid: z.boolean(),
  frame_num: z.number(),
  frame_data: KeyframeData.array(),
});

const PageData = z.object({
  valid: z.boolean(),
  page_index: z.number(),
  lightness: z.number(),
  speed_ms: z.number(),
  color: Color,
  word_page: WordPage,
  frames: Frames,
  keyframes: Keyframe.array().optional(),
});

export const PageData;
