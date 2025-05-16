import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { commentSchema } from "../schemas/comment-schema";
import { Comment } from "../model/comment";



export const useComments = (postId: number) => {
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(`/api/post/${postId}/comment`);
        // console.log("All Comment List", data);
        return data;
    } catch (error) {
        console.error(error);
        console.log("All Comment Error", error);
        toast.error("Failed to load comments.");
        return [];
    }
},
refetchInterval: 5000,
});

  const deleteComment = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/comments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted.");
    },
  onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                toast.error(error.response?.data.message || "Failed to delete comment.");
            }
        }
  });

  const editComment = useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      const parsed = commentSchema.parse({ text: content });
      const { data } = await axiosInstance.put(`/comments/${id}`, parsed);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment updated.");
    },
   onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                toast.error(error.response?.data.message || "Failed to delete comment.");
            }
        }
  });

  return {
    comments,
    deleteComment,
    editComment,
  };
};

