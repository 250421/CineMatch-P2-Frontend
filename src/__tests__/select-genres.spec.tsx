import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SelectGenresPage } from "@/routes/(auth)/_auth.select-genres";
import { axiosInstance } from "@/lib/axios-config";

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

jest.mock("@/lib/axios-config")

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
    await act(async () => {
      fireEvent.click(selectGenreSubmitButton);
    })
    
    await waitFor(() => expect(mockInvalidateQueries).not.toHaveBeenCalled());
  })

  test("Should submit favorite genres with 3 genres selected", async () => {
    jest.spyOn(axiosInstance, "post").mockResolvedValueOnce({
      data: [
        "Action",
        "Adventure",
        "Comedy"
      ],
      status: 200
    });

    jest.spyOn(axiosInstance, "post").mockResolvedValueOnce({
      data: [
        {
          "id": 1,
          "title": "The Matrix"
        }
      ],
      status: 200
    });
    
    render(<RouterProvider router={ router } />);

    fireEvent.click(screen.getByTestId("select-genres-button"));

    const options = screen.getAllByTestId("select-genres-option");
    await waitFor(() => expect(options.length).toBeGreaterThanOrEqual(3));

    fireEvent.click(options[0]);
    fireEvent.click(options[1]);
    fireEvent.click(options[2]);

    const selectGenreSubmitButton = await screen.findByTestId("select-genres-submit-button");
    await act(async () => {
      fireEvent.click(selectGenreSubmitButton);
    })
    
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith({"to": "/message-board/1"}));
  })
})