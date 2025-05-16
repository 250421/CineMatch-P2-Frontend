import { axiosInstance } from "@/lib/axios-config"
import { useQuery } from "@tanstack/react-query"
import type { Genre } from "../models/genres";

export const useGetGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: async (): Promise <Genre[]|null> => {
            try {
                const resp = await axiosInstance.get("/api/genre");
                return resp.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    });
};
