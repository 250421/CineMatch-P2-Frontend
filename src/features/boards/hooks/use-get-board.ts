import { axiosInstance } from "@/lib/axios-config"
import { useQuery } from "@tanstack/react-query"
import { Board } from "../models/board";

export const useGetBoard = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: async (): Promise <Board[] | null> => {
      try {
        const resp = await axiosInstance.get("/api/board");
        return resp.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  });
};
