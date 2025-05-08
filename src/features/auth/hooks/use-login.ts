import { useMutation } from "@tanstack/react-query"
import type { LoginSchemaType } from "../schemas/login-schema"
import { axiosInstance } from "@/lib/axios-config"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"
import { AxiosError } from "axios"

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (values: LoginSchemaType) => {
            const resp = await axiosInstance.post("/auth/login", values);
            return resp.data;
        },

        onSuccess: () => {
            toast.success("User Logged-in");
            navigate({ to: "/" })
        },

        onError: (error) => {
            console.error(error);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }

    });
};