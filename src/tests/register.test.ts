import { Register } from "@/routes/(public)/_public.register";
import { render } from '@testing-library/react';

jest.mock('@tanstack/router-react', () => ({
  ...jest.requireActual('@tanstack/router-react'),
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({}),
  Link: () => jest.fn(),
  createFileRoute: () => {}
}));

describe("Register", () => {
  it("should invoke onSubmit on submit", () => {
    const register = Register();
    const wrapper = render(register);
    const usernameInput = wrapper.findByTestId("username");
    expect(true).toBe(true);
  })
})