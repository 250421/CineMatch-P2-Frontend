export interface Comment {
  id: number;
  post: {
    id: number;
    title: string;
  };
  user?: {  
    id: number;
    username: string;
  };
  text: string;
  rating: number;
  deleted: number;
  createdAt?: string;  
}