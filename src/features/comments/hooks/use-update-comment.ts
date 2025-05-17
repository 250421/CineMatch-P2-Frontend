import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { axiosInstance } from '@/lib/axios-config';
import {  CommentSchemaType } from '../schemas/comment-schema';

export const useUpdateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: CommentSchemaType & {id:number}) => {
            const response = await axiosInstance.patch(`/api/comment`, body);
            return response;
        },
        onSuccess: () => {
            toast("Comment updated.");
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                toast(error.response?.data.message || "Failed to update comment.");
            }
        }
    });
};

