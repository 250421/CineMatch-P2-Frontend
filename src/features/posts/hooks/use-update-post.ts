
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
      const formData = new FormData();

      if (body.image instanceof File)
        formData.append("imageFile", body.image);

      body.hasSpoiler = body.has_spoiler;
      body.image = undefined;
      formData.append("post", new Blob([JSON.stringify(body)], { type: "application/json"}));

      
      const response = await axiosInstance.patch(`/api/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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