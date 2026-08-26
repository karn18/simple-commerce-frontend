"use client";

import { useCallback } from "react";

import { loginUser } from "@/app/api/users";
import { useAppContext } from "@/contexts/app-context";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const { setToken, setUser } = useAppContext();

  return useCallback(
    async (credentials: LoginCredentials) => {
      const response = await loginUser(credentials);

      if (!response?.token || !response?.user) {
        throw new Error("Invalid login response");
      }

      // set user info and token
      setUser(response.user);
      setToken(response.token);

      return response;
    },
    [setToken, setUser],
  );
}
