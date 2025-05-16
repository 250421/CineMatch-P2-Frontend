import {
  useMutation
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { axiosInstance } from '@/lib/axios-config'

export const useFavoriteGenres = () => {
  return useMutation({
    mutationFn: async (body: number[]) => {
      const response = await axiosInstance.post("/api/genre/favorite", body);
      return response;
    },
    onSuccess: () => {
      toast("Updated favorite genres successfully.");
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data.message);
      }
    }
  })
}