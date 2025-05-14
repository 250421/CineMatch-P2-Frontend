import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider, useParams } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";
import { MessageBoardComponent } from "@/routes/(auth)/_auth.message-board.$boardId";

const queryClient = new QueryClient();
const rootRoute = createRootRoute({
  component: () => <QueryClientProvider client={ queryClient }><MessageBoardComponent data-testid="message-board-component" /></QueryClientProvider>,
});
const router = createRouter({ 
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ["/", "/login", "/register", "/message-board/$boardId"]
  })
});

const mockNavigate = jest.fn();
const mockParams = jest.fn(() => 1);
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams
}))

describe("Register component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  })

  test("renders", () => {
    const dom = render(<RouterProvider router={ router } />);
    const register = dom.findByTestId("message-board-component");
    
    waitFor(() => expect(register).toBeInTheDocument());
  })

  test("posts should be a list", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValue({ 
      data: [
        {
            "image": null,
            "deleted": 0,
            "rating": 0,
            "id": 5,
            "text": "content is funny",
            "title": "This is a test post about an action movie",
            "username": "fadelafuente",
            "has_spoiler": 0
        },
        {
            "image": null,
            "deleted": 0,
            "rating": 0,
            "id": 6,
            "text": "content is funny",
            "title": "This is a test post about an action movie",
            "username": "fadelafuente",
            "has_spoiler": 1
        },
      ],
      isLoading: false
    });
    const dom = render(<RouterProvider router={ router } />);

    expect(dom.getAllByTestId("post-card").length).toBe(2);
  })
})