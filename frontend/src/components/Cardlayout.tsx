import type { Post } from "../hooks/post";
import Card from "./Card";

type CardLayoutProps = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onDelete: (postId: string) => Promise<void>;
  onUpdate: (postId: string, data: { title?: string; content?: string }) => Promise<void>;
};

export default function Cardlayout({ posts, loading, error, onDelete, onUpdate }: CardLayoutProps) {
  if (loading && !posts.length) {
    return <p className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600'>Loading notes...</p>;
  }

  if (error && !posts.length) {
    return <p className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>{error}</p>;
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {posts.length ? (
        posts.map((post) => {
          return <Card key={post.id} post={post} onDelete={onDelete} onUpdate={onUpdate} />;
        })
      ) : (
        <div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500 sm:col-span-2 xl:col-span-3'>
          No posts yet. Create your first note.
        </div>
      )}
    </div>
  );
}
