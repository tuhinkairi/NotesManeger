import { useCallback, useEffect, useState } from "react";
import axiosClient from "../../lib/axiosClient";

export type UserInfo = {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

export type UserResponse = {
  message: string;
  data: UserInfo | null;
};

export type UpdateUserPayload = {
  name?: string;
  email?: string;
  password?: string;
};

export default function useUser() {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserInfo(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.get<UserResponse>("/get-user");
      const data = resp.data;
      setUserInfo(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch user";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (payload: UpdateUserPayload) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.put<UserResponse>("/update-user", payload);
      const data = resp.data;
      setUserInfo(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update user";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.delete<UserResponse>("/delete-user");
      const data = resp.data;
      localStorage.removeItem("token");
      setUserInfo(null);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete user";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser().catch(() => undefined);
  }, [getUser]);

  return { getUser, updateUser, deleteUser, userInfo, loading, error };
}
