import { useCallback, useState } from "react";
import axiosClient from "../../lib/axiosClient";

export type PostFilter = "recent" | "new" | "old";

export type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  isShare:boolean;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

export type GetPostsParams = {
  filter?: PostFilter;
  search?: string;
};

export type CreatePostPayload = {
  title: string;
  content: string;
};

export type UpdatePostPayload = {
  postId: string;
  title?: string;
  content?: string;
};

export type DeletePostPayload = {
  postId: string;
};

export type GetPostsResponse = {
  message: string;
  count: number;
  data: Post[];
};

export type PostMutationResponse = {
  message: string;
  data: Post;
};

export default function usePost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = useCallback(async (params?: GetPostsParams) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.get<GetPostsResponse>("/get-posts", {
        params,
      });
      const data = resp.data;
      setPosts(data.data || []);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch posts";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (payload: CreatePostPayload) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.post<PostMutationResponse>("/create-posts", payload);
      const data = resp.data;
      setPosts((prev) => [data.data, ...prev]);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create post";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePost = useCallback(async ({ postId, ...payload }: UpdatePostPayload) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.put<PostMutationResponse>(`/update-posts/${postId}`, payload);
      const data = resp.data;
      setPosts((prev) => prev.map((post) => (post.id === postId ? data.data : post)));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update post";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePost = useCallback(async ({ postId }: DeletePostPayload) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await axiosClient.delete<PostMutationResponse>(`/delete-posts/${postId}`);
      const data = resp.data;
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete post";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    loading,
    error,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    setPosts,
  };
}
