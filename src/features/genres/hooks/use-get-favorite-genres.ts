import { axiosInstance } from "@/lib/axios-config"
import { useQuery } from "@tanstack/react-query"

export const useGetFavoriteGenres = () => {
  return useQuery({
    queryKey: ["favorite-genres"],
    queryFn: async (): Promise <string[]|null> => {
      try {
        const resp = await axiosInstance.get("/api/genre/favorite");
        return resp.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  });
};