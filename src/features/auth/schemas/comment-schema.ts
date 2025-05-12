import { z } from "zod";

export const commentSchema = z.object({
    content: z.string().min(1, {
        message: "Comment cannot be empty."
    }).max(500, {
        message: "Comment must be less than 500 characters."
    }),
});

export type CommentSchemaType = z.infer<typeof commentSchema>;