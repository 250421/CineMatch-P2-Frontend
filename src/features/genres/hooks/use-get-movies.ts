import { axiosInstance } from "@/lib/axios-config"
import { useQuery } from "@tanstack/react-query"
import type { Movie } from "../models/movie";

export const useGetMovies = () => {
    return useQuery({
        queryKey: ["movies"],
        queryFn: async (): Promise <Movie[]|null> => {
            try {
                const resp = await axiosInstance.get("/api/movie");
                return resp.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    });
};
