export interface Post {
    id: number;
    title: string;
    content: string;
    boardId: number;
    image: File | undefined;
    hasSpoiler: boolean;
    dateCreated: string;
}