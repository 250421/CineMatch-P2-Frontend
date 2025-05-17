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

jest.mock("@/lib/axios-config");

const mockBoards = {
  data: [
    {
      id: 1,
      name: "Action",
    },
    {
      id: 2,
      name: "Adventure",
    },
    {
      id: 3,
      name: "Comedy",
    },
  ],
  status: 200,
}

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

describe("tests for the new-post page", () => {
  afterEach(() => {
    jest.resetAllMocks();
  })

  test("renders", () => {
    const dom = render(<RouterProvider router={ router } />);
    const newPostComponent = dom.findByTestId("new-post-component");

    waitFor(() => expect(newPostComponent).toBeInTheDocument());
  })

  test("The title input should change based on the user's input", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValueOnce(mockBoards);
    const dom = render(<RouterProvider router={ router } />);

    const response = await dom.findByTestId("title-input");
    act(() => {
      fireEvent.change(response, { target: { value: "This movie was amazing!" } });
    })
    
    expect(response).toHaveValue("This movie was amazing!");
  })

  test("Simulate a input change in the hasSpoiler checkbox", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValueOnce(mockBoards);
    const dom = render(<RouterProvider router={ router } />);

    const hasSpoilerComponent = await dom.findByTestId("has-spoiler-input");
    act(() => {
      fireEvent.click(hasSpoilerComponent);
    })
    
    expect(hasSpoilerComponent).toBeChecked;
  })

  test("A new post should be successfully created", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValueOnce(mockBoards);
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
    await act(async () => {
      fireEvent.click(boardSelect);
  })

    const option = dom.getAllByRole("option")[0];
    await act(async () => {
      fireEvent.click(option);
    })

    const titleInput = await dom.findByTestId("title-input");
    fireEvent.change(titleInput, { target: { value: "Thunderbolts was amazing!" } });

    const textInput = await dom.findByTestId("new-post-text");
    fireEvent.change(textInput, { target: { value: "If I could rate this movie, I would give it a 10/10. I do NOT want to see my shame room though..." } });

    const submitButton = await dom.findByTestId("new-post-submit-button");
    await act(async () => {
      fireEvent.click(submitButton);
    })
    
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  })

  test("Loader displayed while waiting for data to be fetched", async () => {
    const dom = render(<RouterProvider router={ router } />);
    waitFor(() => expect(dom.getByTestId("loader")).toBeInTheDocument());
  })
})