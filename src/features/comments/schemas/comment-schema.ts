import { z } from "zod";

export const commentSchema = z.object({
    text: z.string().min(1, {
        message: "Comment cannot be empty."
    }).max(255, {
        message: "Comment must be less than 255 characters."
    }),
});

export type CommentSchemaType = z.infer<typeof commentSchema>;