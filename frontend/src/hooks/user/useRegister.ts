import { useState } from "react";
import axiosClient from "../../lib/axiosClient";
import type { UserResponse } from "./useLogin";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export default function useRegister() {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.post<UserResponse>("/register", payload);
      const data = resp.data;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setUserInfo(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Register failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, userInfo, loading, error };
}
