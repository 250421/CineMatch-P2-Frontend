import { LoginPage } from "@/routes/(public)/_public.login";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import {
  createRouter,
  createRootRoute,
  createMemoryHistory,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";

const queryClient = new QueryClient();
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  ),
});
const router = createRouter({
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ["/", "/login", "/register"],
  }),
});

const mockNavigate = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Login component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders login form", async () => {
    const dom = render(<RouterProvider router={router} />);
    const loginTitle = await dom.findByText(/login/i);
    expect(loginTitle).toBeInTheDocument();
  });

  test("Login fails with wrong credentials", async () => {
    jest.spyOn(axiosInstance, "post").mockRejectedValueOnce(
      new AxiosError("Invalid credentials", "401")
    );

    const dom = render(<RouterProvider router={router} />);

    const username = await dom.findByPlaceholderText("Username");
    fireEvent.change(username, { target: { value: "wrongUser" } });

    const password = await dom.findByPlaceholderText("Password");
    fireEvent.change(password, { target: { value: "wrongPassword" } });

    const submitButton = await dom.findByRole("button", { name: /submit/i });
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(0);
    });
  });

  test("Login succeeds with correct credentials", async () => {
    jest.spyOn(axiosInstance, "post").mockResolvedValueOnce({
      data: {
        id: 1,
        username: "testUser",
        token: "mock-token",
      },
      status: 200,
    });

    const dom = render(<RouterProvider router={router} />);

    const username = await dom.findByPlaceholderText("Username");
    fireEvent.change(username, { target: { value: "testUser" } });

    const password = await dom.findByPlaceholderText("Password");
    fireEvent.change(password, { target: { value: "validPassword1!" } });

    const submitButton = await dom.findByRole("button", { name: /submit/i });
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
