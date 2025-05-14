import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { commentSchema } from "../schemas/comment-schema";

export const useComments = (postId: number) => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/api/post/${postId}/comment`);
                return res.data;
            } catch (error) {
                console.error(error);
                toast.error("Failed to load comments.");
                return null;
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
            const parsed = commentSchema.parse({ content });
            return await axiosInstance.put(`/comments/${id}`, parsed);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            toast.success("Comment updated.");
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                toast.error(error.response?.data.message || "Failed to update comment.");
            }
        }
    });

    return {
        comments: data || [],
        deleteComment,
        editComment
    };
};
