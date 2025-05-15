
import {
  useMutation
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { axiosInstance } from '@/lib/axios-config'

export const useUpdateRating = (id: number) => {
  return useMutation({
    mutationFn: async (body: number) => {
      const response = await axiosInstance.post(`/api/post/${id}`, body);
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