import { axiosInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "../models/post";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Post[] | null> => {
      try {
        const resp = await axiosInstance.get("/api/posts");
        return resp.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  });
}