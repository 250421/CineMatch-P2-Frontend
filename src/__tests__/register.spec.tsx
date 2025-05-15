import { Register } from "@/routes/(public)/_public.register";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider, useNavigate } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";

const queryClient = new QueryClient()
const rootRoute = createRootRoute({
  component: () => <QueryClientProvider client={ queryClient }><Register /></QueryClientProvider>,
});
const router = createRouter({ 
  routeTree: rootRoute,
  history: createMemoryHistory({
    initialEntries: ['/', '/login', '/register']
  })
});

jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: jest.fn()
}))

describe("Register component", () => {
  test("renders", () => {
    const dom = render(<RouterProvider router={ router } />);
    const register = dom.findByTestId("register");
    waitFor(() => expect(register).toBeInTheDocument());
  })

  test("Simulate a change in the password-input", () => {
    const dom = render(<RouterProvider router={ router } />);

    async function passwordFn() { 
      const response = await dom.findByTestId("password-input");
      fireEvent.change(response, { target: { value: "testPassword1" } })
      expect(response).toHaveValue("testPassword1");
    }

    passwordFn();
  })

  test("Register button should fail because the form is empty", () => {
    const navigate = useNavigate();
    jest.spyOn(axiosInstance, 'post').mockResolvedValue({ data: {
        "message": "Invalid username. Username must be at least 4 characters and contain only letters and numbers.",
        "timestamp": "2025-05-14T22:35:26.2308493"
      },
      status: 400
    })
    const dom = render(<RouterProvider router={ router } />);

    async function testSubmitForm() { 
      const registerButton = await dom.findByTestId("register-submit");
      fireEvent.click(registerButton)
      expect(navigate).not.toHaveBeenCalled();
      expect(registerButton).toHaveBeenCalledTimes(1);
    }

    testSubmitForm(); 
  })
})