
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { axiosInstance } from '@/lib/axios-config'
import { UpdatePostSchemaType } from '../schemas/update-post-schema'

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdatePostSchemaType) => {
      body.hasSpoiler = body.has_spoiler;
      const response = await axiosInstance.patch(`/api/post`, body);
      return response;
    },
    onSuccess: () => {
      toast("Post updated successfully.");
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