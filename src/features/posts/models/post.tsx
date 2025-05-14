import type { Creator } from "@/features/auth/model/creator";

export interface Post {
    id: number;
    title: string;
    text: string;
    boardId: number;
    image: File | undefined;
    hasSpoiler: boolean;
    created: string;
    user: Creator;
}