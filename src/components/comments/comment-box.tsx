import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentSchema,
  type CommentSchemaType,
} from "@/features/comments/schemas/comment-schema";
import { useAddComment } from "@/features/comments/hooks/use-add-comment";

export function CommentBox({ postId }: { postId: number }) {
  const addComment = useAddComment(postId);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
    },
  });

  const text = useWatch({ control, name: "text" });
  const onSubmit = (data: CommentSchemaType) => {
    addComment.mutate(data, {
      onSuccess: () => {
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
        {...register("text")}
        maxLength={500}
        placeholder="Write a comment..."
        className={errors.text ? "border-red-500" : ""}
      />
      {errors.text && (
        <p className="text-sm text-red-500">{errors.text.message}</p>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {text?.length || 0}/500
        </span>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
}
