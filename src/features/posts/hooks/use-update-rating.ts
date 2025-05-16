
import {
  useMutation
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { axiosInstance } from '@/lib/axios-config'

interface UpdateRatingProps {
  id: number;
  body: number;
}

export const useUpdateRating = () => {
  return useMutation({
    mutationFn: async ({ id, body }: UpdateRatingProps) => {
      const response = await axiosInstance.patch(`/api/post/${id}`, body);
      return response;
    },
    onSuccess: () => {
      toast("Post rated successfully.");
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data.message);
      }
    }
  })
}