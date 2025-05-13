import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, {
    message: "A title is required."
  }).max(50),
  text: z.string().optional(),
  image: z.instanceof(File).refine(value =>
    value && value?.size <= 20000000, {
    message: "Image size is greater than 20mb.",
    path: ["image"],
  }).optional(),
  hasSpoiler: z.boolean(),
  boardId: z.coerce.number({
    message: "A message board is required."
  })
});

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;