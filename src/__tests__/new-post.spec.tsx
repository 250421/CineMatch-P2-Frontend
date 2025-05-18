import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { NewPostComponent } from "@/routes/(auth)/_auth.new-post";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

const rootRoute = createRootRoute({
  component: () => <QueryClientProvider client={ queryClient }><NewPostComponent /></QueryClientProvider>,
});
const router = createRouter({ 
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ["/", "/login", "/register", "/message-board/$boardId", "/new-post"]
  })
});

const mockNavigate = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate
}))

describe("tests for the new-post page", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  })

  test("renders", async () => {
    const dom = render(<RouterProvider router={ router } />);
    const newPostComponent = await dom.findByTestId("new-post-component");

    await waitFor(() => expect(newPostComponent).toBeInTheDocument());
  })

  test("The title input should change based on the user's input", async () => {
    const dom = render(<RouterProvider router={ router } />);

    const response = await dom.findByTestId("title-input");
    act(() => {
      fireEvent.change(response, { target: { value: "This movie was amazing!" } });
    })
    
    expect(response).toHaveValue("This movie was amazing!");
  })

  test("Simulate a input change in the hasSpoiler checkbox", async () => {
    const dom = render(<RouterProvider router={ router } />);

    const hasSpoilerComponent = await dom.findByTestId("has-spoiler-input");
    act(() => {
      fireEvent.click(hasSpoilerComponent);
    })
    
    await waitFor(() => expect(hasSpoilerComponent).toBeChecked);
  })

  test("A new post should be successfully created", async () => {
    jest.spyOn(axiosInstance, "post").mockResolvedValueOnce({
      data: {
      "image": null,
      "deleted": 0,
      "rating": 0,
      "id": 1,
      "text": "If I could rate this movie, I would give it a 10/10. I do NOT want to see my shame room though...",
      "title": "Thunderbolts was amazing!",
      "username": "testUser",
      "has_spoiler": 0,
      "boardId": 1
      },
      status: 200
    });
    const dom = render(<RouterProvider router={ router } />);

    const boardSelect = await dom.findByTestId("new-post-board-select");
    fireEvent.click(boardSelect);

    const option = dom.getAllByRole("option")[0];
    act(() => {
      fireEvent.click(option);
    })

    const titleInput = await dom.findByTestId("title-input");
    act(() => {
      fireEvent.change(titleInput, { target: { value: "Thunderbolts was amazing!" } });
    })

    const textInput = await dom.findByTestId("new-post-text");
    act(() => {
      fireEvent.change(textInput, { target: { value: "If I could rate this movie, I would give it a 10/10. I do NOT want to see my shame room though..." } });
    })

    const submitButton = await dom.findByTestId("new-post-submit-button");
    act(() => {
      fireEvent.click(submitButton);
    })
    
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  })
})