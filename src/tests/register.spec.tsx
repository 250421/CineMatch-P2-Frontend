import { Register } from "@/routes/(public)/_public.register";
import { render, waitFor } from '@testing-library/react';
import { createRouter, createRootRoute, createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


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

describe("Register component", () => {
  test("renders", () => {
    const dom = render(<RouterProvider router={ router } />);
    const usernameInput = dom.findByTestId("register");
    waitFor(() => expect(usernameInput).toBeInTheDocument());
  })
})