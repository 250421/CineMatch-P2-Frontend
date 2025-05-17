import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id:number) => {
            const response = await axiosInstance.delete(`api/comment/${id}`);
            return response.data;
                },
        onSuccess: () => {
            toast.success("Comment deleted successfully.");
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                toast.error(error.response?.data.message || "Failed to delete comment.");
            }
        },
    });
};
