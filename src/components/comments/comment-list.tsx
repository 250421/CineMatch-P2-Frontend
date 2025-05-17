import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentSchema,
  type CommentSchemaType,
} from "@/features/comments/schemas/comment-schema";
import { Comment } from "@/features/comments/model/comment";
import { useFetchComments } from "@/features/comments/hooks/use-fetch-comments";
import { useUpdateComment } from "@/features/comments/hooks/use-update-comment";
import { useDeleteComment } from "@/features/comments/hooks/use-delete-comment";
import { useConfirm } from "@/hooks/use-confirm";

interface CommentListProps {
  postId: number;
}

export function CommentList({ postId }: CommentListProps) {
  const comments = useFetchComments(postId);
  const editComment = useUpdateComment();
  const {mutate :deleteComment}  = useDeleteComment();
  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteConfirm, DeleteDialog] = useConfirm();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
  });

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    reset({ text: comment.text });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
  };

   const handleDelete = async (id:number) => {
    const ok = await deleteConfirm();
    if (!ok) return;
    deleteComment(id);
  };

  const onSubmitEdit = (data: CommentSchemaType) => {
    if (!editingId) return;
    editComment.mutate(
      {
        id: editingId,
        text: data.text,
      },
      {
        onSuccess: () => {
          setEditingId(null);
          reset();
        },
      }
    );
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-4">
        No comments yet
      </div>
    );
  }

  return (
  <>
    <div className="space-y-4">
      {comments.map((comment) => {
        if (!comment || comment.deleted === 1) return null;

        return (
          <div key={comment.id} className="border rounded-lg p-4">
            {editingId === comment.id ? (
              <form
                onSubmit={handleSubmit((data) => onSubmitEdit(data))}
                className="space-y-2"
              >
                <Textarea
                  {...register("text")}
                  maxLength={255}
                  className={errors.text ? "border-red-500" : ""}
                />
                {errors.text && (
                  <p className="text-sm text-red-500">{errors.text.message}</p>
                )}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} data-testid="submit-edit-comment-button">
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {comment.username || "Anonymous"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(comment)}
                      data-testid="edit-comment-button"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2">{comment.text}</p>
              </>
            )}
          </div>
        );
      })}
    </div>
     <DeleteDialog
        title="Delete Comment"
        description="Are you sure you want to delete this comment?"
        destructive
      />
    </>
  );
}
