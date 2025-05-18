import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { PostCard } from "@/features/posts/components/post-card";
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Post } from "@/features/posts/models/post";
import { mockNavigate } from "../../jest.setup";
import userEvent from "@testing-library/user-event";
import { axiosInstance } from "@/lib/axios-config";

const mockPost = {
  "image": undefined,
  "deleted": 0,
  "rating": 0,
  "id": 5,
  "text": "content is funny",
  "title": "This is a test post about an action movie",
  "username": "fadelafuente",
  "has_spoiler": 1
} as Post

const mockUser = {
  id: 1,
  username: "fadelafuente",
  role: "USER",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

const rootRoute = createRootRoute({
  component: () => <QueryClientProvider client={ queryClient }><PostCard post={ mockPost } user={ mockUser } setDeleteOpen={ jest.fn() } setUpdateOpen={ jest.fn() } /></QueryClientProvider>,
});
const router = createRouter({ 
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ["/", "/message-board/$boardId", "/new-post", "/select-genres"]
  })
});

jest.mock("@/lib/axios-config");

describe("PostCard Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockNavigate.mockClear();
  })

  test("renders the post title and username", async () => {
    render(<RouterProvider router={ router } />);

    await waitFor(() => expect(screen.getByTestId("post-card-title")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId("post-card-username")).toBeInTheDocument());
  });

  test("reveals spoiler when clicked", async () => {
    render(<RouterProvider router={ router } />);

    const hiddenContent = screen.getByTestId("hidden-content");
    expect(hiddenContent).toBeInTheDocument();

    act(() => {
      fireEvent.click(hiddenContent);
    })
    
    expect(screen.queryByTestId("hidden-content")).not.toBeInTheDocument();
  });

  test("shows dropdown options for edit/delete when user is the author", async () => {
    render(<RouterProvider router={ router } />);

    const dropdownTrigger = await screen.findByTestId("post-card-dropdown-trigger");
    await userEvent.click(dropdownTrigger);

    const updateButton = screen.getByTestId("post-card-update-button");
    expect(updateButton).toBeInTheDocument();
    expect(screen.getByTestId("post-card-update-button")).toBeInTheDocument();
  });

  test("does not show edit/delete when user is not the author", async () => {
    const anotherUser = { id: 2, username: "fdelafuente", role: "USER" };
    const secondRootRoute = createRootRoute({
      component: () => <QueryClientProvider client={ queryClient }><PostCard post={ mockPost } user={ anotherUser } setDeleteOpen={ jest.fn() } setUpdateOpen={ jest.fn() } /></QueryClientProvider>,
    });

    const secondRouter = createRouter({ 
      routeTree: secondRootRoute,
      history: createMemoryHistory({
        initialEntries: ["/", "/message-board/$boardId", "/new-post", "/select-genres"]
      })
    });

    render(<RouterProvider router={ secondRouter } />);

    const dropdownTrigger = await screen.findByTestId("post-card-dropdown-trigger");
    await userEvent.click(dropdownTrigger);

    const updateButton = screen.queryByTestId("post-card-update-button");
    expect(updateButton).not.toBeInTheDocument();
    expect(screen.queryByTestId("post-card-update-button")).not.toBeInTheDocument();
  });

  test("clicking the down-arrow button should add or remove a -1 rating", async () => {
    jest.spyOn(axiosInstance, "patch").mockResolvedValueOnce({
      data: {
        "image": null,
        "deleted": 0,
        "rating": -1,
        "id": 6,
        "text": "content is funny",
        "title": "This is a test post about an action movie",
        "username": "fadelafuente",
        "has_spoiler": 1
    },
      status: 200
    });

    jest.spyOn(axiosInstance, "patch").mockResolvedValueOnce({
      data: {
        "image": null,
        "deleted": 0,
        "rating": 0,
        "id": 6,
        "text": "content is funny",
        "title": "This is a test post about an action movie",
        "username": "fadelafuente",
        "has_spoiler": 1
    },
      status: 200
    });
    render(<RouterProvider router={ router } />);

    const postDislikeButton = await screen.findByTestId("post-dislike-button");
    await act(async () => {
      fireEvent.click(postDislikeButton);
    })

    const postRating = screen.getByTestId("post-rating");
    await waitFor(() => expect(postRating).toContainHTML('<p class="min-w-[2rem] text-center font-medium" data-testid="post-rating">-1</p>'));

    await act(async () => {
      fireEvent.click(postDislikeButton);
    })

    await waitFor(() => expect(postRating).toContainHTML('<p class="min-w-[2rem] text-center font-medium" data-testid="post-rating">0</p>'));
  });

  test("clicking the up-arrow button should add or remove a +1 rating", async () => {
    jest.spyOn(axiosInstance, "patch").mockResolvedValueOnce({
      data: {
        "image": null,
        "deleted": 0,
        "rating": 1,
        "id": 6,
        "text": "content is funny",
        "title": "This is a test post about an action movie",
        "username": "fadelafuente",
        "has_spoiler": 1
    },
      status: 200
    });

    jest.spyOn(axiosInstance, "patch").mockResolvedValueOnce({
      data: {
        "image": null,
        "deleted": 0,
        "rating": 0,
        "id": 6,
        "text": "content is funny",
        "title": "This is a test post about an action movie",
        "username": "fadelafuente",
        "has_spoiler": 1
    },
      status: 200
    });
    render(<RouterProvider router={ router } />);

    const postLikeButton = await screen.findByTestId("post-like-button");
    await act(async () => {
      fireEvent.click(postLikeButton);
    })

    const postRating = screen.getByTestId("post-rating");
    await waitFor(() => expect(postRating).toContainHTML('<p class="min-w-[2rem] text-center font-medium" data-testid="post-rating">1</p>'));

    await act(async () => {
      fireEvent.click(postLikeButton);
    })

    await waitFor(() => expect(postRating).toContainHTML('<p class="min-w-[2rem] text-center font-medium" data-testid="post-rating">0</p>'));
  });
});