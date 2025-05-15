import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios-config';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(`/api/post/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Post deleted successfully');
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data.message);
      }
    }
  });
}