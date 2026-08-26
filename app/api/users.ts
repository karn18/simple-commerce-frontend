import type { User } from "@/types/user";
import { BASE_URL } from "./constants";

interface RegisterUserResponse {
  id: number;
  address: string;
}

interface RegisterUserRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
}

interface LoginUserResponse {
  token: string;
  user: User;
}

interface LoginUserRequest {
  email: string;
  password: string;
}

export async function registerUser(
  user: RegisterUserRequest,
): Promise<RegisterUserResponse> {
  const response = await fetch(`${BASE_URL}/api/shop/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
}

export async function loginUser({
  email,
  password,
}: LoginUserRequest): Promise<LoginUserResponse> {
  const response = await fetch(`${BASE_URL}/api/shop/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login user");
  }

  return response.json();
}
