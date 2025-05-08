
import {
  useMutation
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { RegisterSchemaType } from '../schemas/register-schema'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { axiosInstance } from '@/lib/axios-config'

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: RegisterSchemaType) => {
      const response = await axiosInstance.post("/auth/register", body);
      return response;
    },
    onSuccess: () => {
      toast("Account created successfully.");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data.message);
      }
    }
  })
}