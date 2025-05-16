import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { Comment } from "../model/comment";

export const useFetchComments = (postId: number) => {
  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(`/api/post/${postId}/comment`);
        // console.log("All Comment List", data);
        return data;
    } catch (error) {
        console.error(error);
        console.log("All Comment Error", error);
        toast.error("Failed to load comments.");
        return [];
    }
},
refetchInterval: 5000,
});
return comments;
};

// {
//   const queryClient = useQueryClient();

//   const { data: comments = [] } = useQuery<Comment[]>({
//     queryKey: ["comments", postId],
//     queryFn: async () => {
//       try {
//         const { data } = await axiosInstance.get(`/api/post/${postId}/comment`);
//         // console.log("All Comment List", data);
//         return data;
//     } catch (error) {
//         console.error(error);
//         console.log("All Comment Error", error);
//         toast.error("Failed to load comments.");
//         return [];
//     }
// },
// refetchInterval: 5000,
// });