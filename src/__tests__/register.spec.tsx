import { Register } from "@/routes/(public)/_public.register";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";

const queryClient = new QueryClient();
const rootRoute = createRootRoute({
  component: () => <QueryClientProvider client={ queryClient }><Register data-testid="register-component" /></QueryClientProvider>,
});
const router = createRouter({ 
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ["/", "/login", "/register"]
  })
});

const mockNavigate = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate
}))

jest.mock("@/lib/axios-config");

describe("Register component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  })

  test("renders", () => {
    const dom = render(<RouterProvider router={ router } />);
    const register = dom.findByTestId("register");
    const requirementCheck = dom.findAllByTestId("requirement-check");
    
    waitFor(() => expect(register).toBeInTheDocument());
    waitFor(() => expect(requirementCheck).toBeInTheDocument());
  })

  test("Simulate a change in the password-input", async () => {
    const dom = render(<RouterProvider router={ router } />);

    const response = await dom.findByTestId("password-input");
    act(() => {
      fireEvent.change(response, { target: { value: "testPassword1" } });
    })
    const requirementCheck = await dom.findAllByTestId("requirement-check");
    
    expect(response).toHaveValue("testPassword1");
    expect(requirementCheck.length).toBeGreaterThan(0);
  })

  test("Register button should fail because the form is empty", async () => {
    jest.spyOn(axiosInstance, "post").mockRejectedValueOnce(new AxiosError(
      "Invalid username. Username must be at least 4 characters and contain only letters and numbers.",
      "400"
    ));
    const dom = render(<RouterProvider router={ router } />);

    const registerButton = await dom.findByTestId("register-submit");
    act(() => {
      fireEvent.click(registerButton);
    })

    expect(mockNavigate).toHaveBeenCalledTimes(0);
  })

  test("Register button should fail because the password is invalid", async () => {
    jest.spyOn(axiosInstance, "post").mockRejectedValueOnce(new AxiosError(
      "Invalid password. Password must be at least 8 characters. A lower-case letter must occur at least once. An upper-case letter must occur at least once. A number must occur at least once. A special character must occur at least once.",
      "400"
    ));
    const dom = render(<RouterProvider router={ router } />);

    const username = await dom.findByTestId("username-input");
    fireEvent.change(username, { target: { value: "testUser" } });

    const password = await dom.findByTestId("password-input");
    fireEvent.change(password, { target: { value: "testPassword1" } });

    const re_password = await dom.findByTestId("re-password-input");
    fireEvent.change(re_password, { target: { value: "testPassword1" } });

    const registerButton = await dom.findByTestId("register-submit");
    act(() => {
      fireEvent.click(registerButton);
    })

    expect(mockNavigate).toHaveBeenCalledTimes(0);
  })

    test("Register button should pass because the form is valid", async () => {
    jest.spyOn(axiosInstance, "post").mockResolvedValueOnce({ data: {
      "id": 5,
      "username": "testUser",
      "password": "",
      "role": "USER",
      "genre_1": null,
      "genre_2": null,
      "genre_3": null,
      "genreChangedTime": "2025-05-15T00:14:35.4941026"
      },
      status: 200
    });
    const dom = render(<RouterProvider router={ router } />);

    const username = await dom.findByTestId("username-input");
    fireEvent.change(username, { target: { value: "testUser" } });

    const password = await dom.findByTestId("password-input");
    fireEvent.change(password, { target: { value: "testPassword1@" } });

    const re_password = await dom.findByTestId("re-password-input");
    fireEvent.change(re_password, { target: { value: "testPassword1@" } });
    
    const registerButton = await dom.findByTestId("register-submit");
    act(() => {
      fireEvent.click(registerButton);
    })

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  })
})