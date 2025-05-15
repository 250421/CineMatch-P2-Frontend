import type { Creator } from "@/features/auth/model/creator";

export interface Post {
    id: number;
    title: string;
    text: string;
    boardId: number;
    image: File | undefined;
    has_spoiler: boolean;
    created: string;
    user: Creator;
}