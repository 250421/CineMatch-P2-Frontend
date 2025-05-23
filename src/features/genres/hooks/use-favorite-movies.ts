import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { axiosInstance } from '@/lib/axios-config'

export const useFavoriteMovies = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: number[]) => {
      const response = await axiosInstance.post("/api/movie/favorite", body);
      return response;
    },
    onSuccess: () => {
      toast("Updated favorite movies successfully.");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data.message);
      }
    }
  })
}