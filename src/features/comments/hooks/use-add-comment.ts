import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { type CommentSchemaType } from "../schemas/comment-schema";

export const useAddComment = (postId: number) => {
    const queryClient = useQueryClient();
    return (
        useMutation({
            mutationFn: async (body: CommentSchemaType) => {
                const resp = await axiosInstance.post(`/api/post/${postId}/comment`, body);
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
        })
    )
}
