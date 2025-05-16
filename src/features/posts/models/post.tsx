export interface Post {
    id: number;
    title: string;
    text: string;
    boardId: number;
    image: File | undefined;
    has_spoiler: number;
    created: string;
    username: string;
    deleted: number;
    rating: number;
}