import { useComments } from "@/features/auth/hooks/use-comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentSchema,
  type CommentSchemaType,
} from "@/features/auth/schemas/comment-schema";

export function CommentBox({ postId }: { postId: number }) {
  const { addComment } = useComments(postId);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const content = useWatch({ control, name: "content" });
  const onSubmit = (data: CommentSchemaType) => {
    addComment.mutate(data, {
      onSuccess: () => {
        toast.success("Comment posted!");
        reset();
      },
      onError: () => {
        toast.error("Error posting comment.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Textarea
        {...register("content")}
        maxLength={500}
        placeholder="Write a comment..."
        className={errors.content ? "border-red-500" : ""}
      />
      {errors.content && (
        <p className="text-sm text-red-500">{errors.content.message}</p>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {content?.length || 0}/500
        </span>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
}
