
import {
  useMutation
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { axiosInstance } from '@/lib/axios-config'
import type { CreatePostSchemaType } from '../schemas/create-post-schema'

export const useCreatePost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: CreatePostSchemaType) => {
      // TODO: I just get all of the boards right now, need to switch this endpoint to grabbing 
      //       The current user's message boards.
      const formData = new FormData();

      if (body.image instanceof File)
        formData.append("imageFile", body.image);

      body.image = undefined;
      formData.append("post", new Blob([JSON.stringify(body)], { type: "application/json"}));

      const response = await axiosInstance.post(`/api/board/${body.boardId}/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      response.data.boardId = body.boardId;
      return response;
    },
    onSuccess: (response) => {
      toast("Post created successfully.");
      navigate({ to: `/message-board/${response.data.boardId}` });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data.message);
      }
    }
  })
}