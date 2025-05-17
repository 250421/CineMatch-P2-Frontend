import { mockBoards, mockFavoriteGenres, mockGenres, mockPosts } from "@/__mock__/mock-data";
import "@testing-library/jest-dom";

export const mockNavigate = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(() => ({ boardId: "1" }))
}))

jest.mock("@/lib/axios-config", () => ({
  axiosInstance: {
    get: (url: string) => {
      if(url === "/api/board") {
        return Promise.resolve(mockBoards);
      } else if(url === "/api/genre/favorite") {
        return Promise.resolve(mockFavoriteGenres);
      } else if(url === "/api/genre") {
        return Promise.resolve(mockGenres);
      } else if(url === "/api/post") {
        return Promise.resolve(mockPosts);
      } else if(url.includes("/comment")) {
        return Promise.resolve({ data: [], status: 200 })
      }
      return Promise.resolve({ data: [], status: 200 });
    },
    post: jest.fn()
  },
}));

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};