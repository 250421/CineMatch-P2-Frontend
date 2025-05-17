import { mockBoards, mockFavoriteGenres, mockGenres, mockPosts } from "./mock-data";

jest.mock("@/lib/axios-config", () => ({
  axiosInstance: {
    get: (url: string) => {
      if(url === "/api/boards") {
        return Promise.resolve(mockBoards);
      } else if(url === "/api/genres/favorite") {
        return Promise.resolve(mockFavoriteGenres);
      } else if(url === "/api/genres") {
        return Promise.resolve(mockGenres);
      } else if(url === "/api/posts") {
        return Promise.resolve(mockPosts);
      }
      return Promise.resolve({ data: [], status: 200 });
    },
  },
}));