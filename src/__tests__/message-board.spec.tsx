import { render, waitFor } from "@testing-library/react";
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { MessageBoardComponent } from "@/routes/(auth)/_auth.message-board.$boardId";
import { mockPosts } from "@/__mock__/mock-data";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

const mockNavigate = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(() => ({ boardId: "1" }))
}))

const rootRoute = createRootRoute({
  component: () => <QueryClientProvider client={ queryClient }><MessageBoardComponent data-testid="message-board-component" /></QueryClientProvider>,
});
const router = createRouter({ 
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ["/", "/login", "/register", "/message-board/$boardId"]
  })
});

jest.mock("@/lib/axios-config");

describe("message-board with id component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockNavigate.mockClear();
  })

  test("renders", () => {
    const dom = render(<RouterProvider router={ router } />);
    const messageBoardComponent = dom.findByTestId("message-board-container");
    
    waitFor(() => expect(messageBoardComponent).toBeInTheDocument());
  })

  test("posts should be a list", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValueOnce(mockPosts);
    const dom = render(<RouterProvider router={ router } />);

    await waitFor(() => {
      expect(dom.getAllByTestId("post-card").length).toBe(2);
      expect(dom.getByTestId("message-board")).toBeInTheDocument();
      expect(dom.queryByTestId("loader")).toBeNull();
    });
  })

  test("No posts found due to an empty list", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValue({ data: [], status: 200 });
    const dom = render(<RouterProvider router={ router } />);

    await waitFor(() => expect(dom.queryByTestId("message-board")).toBeNull());
    await waitFor(() => expect(dom.getByTestId("no-post-found")).toBeInTheDocument());
  })
})