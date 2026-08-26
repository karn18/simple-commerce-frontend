import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { LoginForm } from "../components/users/login-form";

const { login, push } = vi.hoisted(() => ({
  login: vi.fn(),
  push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/app/hooks/auth", () => ({
  useLogin: () => login,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test("submits credentials and navigates after a successful login", async () => {
  login.mockResolvedValue({ token: "token", user: { id: 1 } });
  const { container } = render(<LoginForm />);

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "user@example.com" },
  });
  fireEvent.change(container.querySelector("#password") as HTMLInputElement, {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password",
    });
    expect(push).toHaveBeenCalledWith("/");
  });
});

test("shows an error when login fails", async () => {
  login.mockRejectedValue(new Error("Invalid credentials"));
  const { container } = render(<LoginForm />);

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "user@example.com" },
  });
  fireEvent.change(container.querySelector("#password") as HTMLInputElement, {
    target: { value: "wrong-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  expect(await screen.findByText("Invalid email or password")).toBeDefined();
  expect(push).not.toHaveBeenCalled();
});
