import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentSchema,
  type CommentSchemaType,
} from "@/features/comments/schemas/comment-schema";
import { useAddComment } from "@/features/comments/hooks/use-add-comment";

interface CommentBoxProps {
  postId: number;
  onCommentPosted?: () => void; 
}

export function CommentBox({ postId, onCommentPosted }: CommentBoxProps) {
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
        onCommentPosted?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Textarea
        {...register("text")}
        maxLength={255}
        placeholder="Write a comment..."
        className={"field-sizing-fixed bg-bg-blue2 focus-visible:ring-0 focus-visible:border-focus " + (errors.text ? "border-red-500" : "border-border-blue")}
      />
      {errors.text && (
        <p className="text-sm text-red-500">{errors.text.message}</p>
      )}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {text?.length || 0}/255
        </span>
        <Button type="submit" disabled={isSubmitting} className="bg-button text-card-blue hover:bg-text-light cursor-pointer">
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
}
