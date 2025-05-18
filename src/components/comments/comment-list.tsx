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
import { useUpdateComment } from "@/features/comments/hooks/use-update-comment";
import { useDeleteComment } from "@/features/comments/hooks/use-delete-comment";
import { useConfirm } from "@/hooks/use-confirm";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Separator } from "../ui/separator";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  
  const editComment = useUpdateComment();
  const {mutate :deleteComment}  = useDeleteComment();
  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteConfirm, DeleteDialog] = useConfirm();
  const  user  = useAuth();

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
      <div className="text-muted-foreground text-center py-4 border rounded-lg bg-bg-blue2/20 border-border-blue text-muted-text-blue2">
        No comments yet
      </div>
    );
  }

  return (
  <>
    <div className="border rounded-lg bg-bg-blue2/20 border-border-blue">
      {comments.map((comment, index) => {
        if (!comment || comment.deleted === 1) return null;

        const isOwner = user?.data?.username === comment.username;
        const isAdmin = user?.data?.role === "ADMIN";
        const canManage = isOwner || isAdmin;

        return (
          <div key={comment.id} className="px-4">
            {index != 0 && <Separator className="bg-muted-text-blue2"/>}
            <div className="py-4 relative">
              {editingId === comment.id ? (
                <form
                  onSubmit={handleSubmit((data) => onSubmitEdit(data))}
                  className="space-y-2"
                >
                  <Textarea
                    {...register("text")}
                    maxLength={255}
                    className={"field-sizing-fixed bg-bg-blue2 focus-visible:ring-0 focus-visible:border-focus " + (errors.text ? "border-red-500" : "border-border-blue")}
                  />
                  {errors.text && (
                    <p className="text-sm text-red-500">{errors.text.message}</p>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                      className="cursor-pointer bg-muted-text-blue border-0 hover:bg-muted-text-blue3 text-card-blue"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="cursor-pointer bg-button text-card-blue hover:bg-text-light" data-testid="submit-edit-comment-button">
                      {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="">
                    <div>
                      <p className="font-medium">
                        {comment.username || "Anonymous"}
                      </p>
                    </div>
                    <div className="flex gap-1 absolute top-2 right-1">
                      {isOwner && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(comment)}
                        className="hover:bg-muted-text-blue cursor-pointer hover:text-blue-500"
                        data-testid="edit-comment-button"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      )}
                      {canManage && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(comment.id)}
                        className="hover:bg-muted-text-blue cursor-pointer hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )} 
                    </div>
                  </div>
                  <p className="mt-1 text-muted-text-blue3">{comment.text}</p>
                </>
              )}
            </div>
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
