import { useState } from "react";
import axiosClient from "../../lib/axiosClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type UserResponse = {
  token?: string;
  [key: string]: unknown;
};

export default function useLogin() {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.post<UserResponse>("/login", payload);
      const data = resp.data;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setUserInfo(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, userInfo, loading, error };
}
