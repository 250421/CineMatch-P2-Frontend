import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { axiosInstance } from '@/lib/axios-config';
import { CommentSchemaType } from '../schemas/comment-schema';

export const useEditComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: CommentSchemaType) => {
            // const parsed = commentSchema.parse({ text: body.text });
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


// return useMutation({
//     mutationFn: async (body: UpdatePostSchemaType) => {
//       body.hasSpoiler = body.has_spoiler;
//       const response = await axiosInstance.patch(`/api/post`, body);
//       return response;
//     },