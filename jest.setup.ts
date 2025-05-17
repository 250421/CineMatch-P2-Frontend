import "@testing-library/jest-dom";

export const mockNavigate = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(() => ({ boardId: "1" }))
}))