import { z } from "zod";

export const UpdatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, {
    message: "A title is required."
  }).max(50),
  text: z.string().optional(),
  image: z.instanceof(File).refine(value =>
    value && value?.size <= 20000000, {
    message: "Image size is greater than 20mb.",
    path: ["image"],
  }).optional(),
  has_spoiler: z.coerce.number(),
  hasSpoiler: z.coerce.number().optional(),
});

export type UpdatePostSchemaType = z.infer<typeof UpdatePostSchema>;