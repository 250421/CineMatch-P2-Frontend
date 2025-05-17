import { fireEvent, render, waitFor } from "@testing-library/react";
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockBoards, mockFavoriteGenres, mockGenres, mockMovies, mockPosts } from "@/__mock__/mock-data";
import { SelectGenresPage } from "@/routes/(auth)/_auth.select-genres";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

const rootRoute = createRootRoute({
  component: () => <QueryClientProvider client={ queryClient }><SelectGenresPage /></QueryClientProvider>,
});
const router = createRouter({ 
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ["/", "/message-board/$boardId", "/new-post", "/select-genres"]
  })
});

jest.mock("@/lib/axios-config", () => ({
  axiosInstance: {
    get: (url: string) => {
      console.log(url);
      if(url.includes("/board")) {
        return Promise.resolve(mockBoards);
      } else if(url === "/api/movie") {
        return Promise.resolve(mockMovies);
      } else if(url === "/api/genre") {
        console.log("mocked", mockGenres);
        return Promise.resolve(mockGenres);
      }
      return Promise.resolve({ data: [], status: 200 });
    },
  },
}));

function createMockPointerEvent(
  type: string,
  props: PointerEventInit = {}
): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? "mouse",
  });
  return event;
}

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

window.PointerEvent = createMockPointerEvent as any;

Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

const mockNavigate = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate
}))

const mockInvalidateQueries = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  invalidateQueries: () => mockInvalidateQueries
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
      }
      return Promise.resolve({ data: [], status: 200 });
    },
  },
}));

describe("tests for the new-post page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockNavigate.mockClear();
  })

  test("The select-genres page renders", async () => {
    const dom = render(<RouterProvider router={ router } />);
    const newPostComponent = await dom.findByTestId("select-genres-component");

    expect(newPostComponent).toBeInTheDocument();
  })

  test("Cannot submit favorite genres unless 3 are selected", async () => {
    const dom = render(<RouterProvider router={ router } />);

    const selectGenreSubmitButton = await dom.findByTestId("select-genres-submit-button");
    fireEvent.click(selectGenreSubmitButton);
    
    await waitFor(() => expect(mockInvalidateQueries).not.toHaveBeenCalled());
  })
})