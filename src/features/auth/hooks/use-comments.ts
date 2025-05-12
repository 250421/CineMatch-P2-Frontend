import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { commentSchema, type CommentSchemaType } from "../schemas/comment-schema";

export const useComments = (postId: string) => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/posts/${postId}/comments`);
                return res.data;
            } catch (error) {
                console.error(error);
                toast.error("Failed to load comments.");
                return null;
            }
        },
        refetchInterval: 5000,
    });

    const addComment = useMutation({
        mutationFn: async (body: CommentSchemaType) => {
            const resp = await axiosInstance.post(`/posts/${postId}/comments`, body);
            return resp;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            toast.success("Comment added!");
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                toast.error(error.response?.data.message || "Failed to add comment.");
            }
        }
    });

    const deleteComment = useMutation({
        mutationFn: (id: string) => axiosInstance.delete(`/comments/${id}`),
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
        mutationFn: async ({ id, content }: { id: string; content: string }) => {
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
        addComment,
        deleteComment,
        editComment
    };
};
