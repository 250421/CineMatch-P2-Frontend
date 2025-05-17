import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteComment = (commentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => axiosInstance.delete(`/comments/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", commentId] });
            toast.success("Comment deleted.");
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                toast.error(error.response?.data.message || "Failed to delete comment.");
            }
        },
    });
};
