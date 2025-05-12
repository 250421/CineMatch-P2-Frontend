import { axiosInstance } from '@/lib/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            const resp = await axiosInstance.post("/auth/logout");
            return resp.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["auth"],
            });
            toast.success("Logged out Successfully");
            navigate({ to: "/login" })
        },
        onError: (error) => {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "An error occurred")
            }
        }
    });
}
