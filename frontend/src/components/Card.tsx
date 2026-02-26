import { useEffect, useState } from "react";
import type { Post } from "../hooks/post";

type CardProps = {
  post: Post;
  onDelete: (postId: string) => Promise<void>;
  onUpdate: (postId: string, data: { title?: string; content?: string }) => Promise<void>;
};

export default function Card({ post, onDelete, onUpdate }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post.title, post.content, post.id]);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      await onDelete(post.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete note";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    setLoading(true);
    setError(null);
    const nextTitle = title.trim();
    const nextContent = content.trim();

    if (!nextTitle || !nextContent) {
      setError("Title and content are required.");
      setLoading(false);
      return;
    }

    try {
      await onUpdate(post.id, { title: nextTitle, content: nextContent });
      setIsEditing(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update note";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-64 flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
      <div className='space-y-2 overflow-auto'>
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'
              placeholder='title'
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'
              rows={5}
              placeholder='content'
            />
          </>
        ) : (
          <>
            <p className='text-xs uppercase tracking-[0.12em] text-slate-500'>Note</p>
            <h3 className='line-clamp-2 text-lg font-semibold text-slate-800'>{post.title}</h3>
            <p className='line-clamp-5 text-sm text-slate-600'>{post.content}</p>
          </>
        )}
        {error && <p className='text-xs text-red-600 mt-2'>{error}</p>}
      </div>
      <div className='flex gap-2 justify-end border-t border-slate-100 pt-3'>
        {isEditing ? (
          <>
            <button
              type='button'
              onClick={() => {
                setTitle(post.title);
                setContent(post.content);
                setIsEditing(false);
                setError(null);
              }}
              className='rounded-lg border border-slate-300 px-3 py-1.5 text-sm'
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={handleUpdate}
              className='rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white disabled:opacity-60'
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              onClick={() => setIsEditing(true)}
              className='rounded-lg border border-slate-300 px-3 py-1.5 text-sm'
              disabled={loading}
            >
              Edit
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white disabled:opacity-60'
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
