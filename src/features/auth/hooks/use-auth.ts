import { axiosInstance } from "@/lib/axios-config"
import { useQuery } from "@tanstack/react-query"
import type { Auth } from "../model/auth"

export const useAuth = () => {
    return useQuery({
        queryKey: ["auth"],
        queryFn: async (): Promise <Auth|null> => {
            try {
                const resp = await axiosInstance.get("/auth/session");
                return resp.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    });
};
