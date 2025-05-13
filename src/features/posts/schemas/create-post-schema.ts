import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, {
    message: "A title is required."
  }).max(50),
  content: z.string().optional(),
  image: z.instanceof(File).refine(value =>
    value && value?.size <= 20000000, {
    message: "Image size is greater than 20mb.",
    path: ["image"],
  }).optional(),
  hasSpoiler: z.boolean(),
  boardId: z.coerce.number()
});

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;