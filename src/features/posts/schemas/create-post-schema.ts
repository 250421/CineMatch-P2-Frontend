import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, {
    message: "A title is required."
  }).max(50),
  content: z.string().optional(),
  image: z.instanceof(File).optional(),
  hasSpoiler: z.boolean()
}).refine(value =>
  value.image && value.image?.size <= 20000000, {
  message: "Image size is greater than 20mb.",
  path: ["image"],
});

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;