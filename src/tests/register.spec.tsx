import { Register } from "@/routes/(public)/_public.register";
import { render } from '@testing-library/react';
import { toast } from "sonner";
import axios from "axios";
import { createRouter, createRootRoute, RouterProvider } from '@tanstack/react-router';

const rootRoute = createRootRoute();
const testRouter = createRouter({ routeTree: rootRoute });

function renderWithRouter() {
  return render(<RouterProvider router={testRouter} />);
}


describe("Register", () => {
  it("should invoke onSubmit on submit", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const wrapper = render(<Register />);
    const usernameInput = wrapper.findAllByRole("input");
    expect(usernameInput).toBeInTheDocument();
    mockedAxios.post.mockResolvedValue({
      data: []
    })
  })
})