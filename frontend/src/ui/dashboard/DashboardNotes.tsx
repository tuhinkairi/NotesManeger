import { useCallback, useEffect, useState } from "react";
import Cardlayout from "../../components/Cardlayout";
import AddNote from "../../components/AddNote";
import usePost, { type CreatePostPayload, type UpdatePostPayload } from "../../hooks/post";

export default function DashboardNotes() {
  const [openAddBox, handleOpenAddBox] = useState<boolean>(false);
  const { posts, loading, error, getPosts, createPost, updatePost, deletePost } = usePost();

  useEffect(() => {
    getPosts().catch(() => undefined);
  }, [getPosts]);

  const handleCreate = useCallback(
    async (payload: CreatePostPayload) => {
      await createPost(payload);
    },
    [createPost]
  );

  const handleUpdate = useCallback(
    async (postId: string, data: Omit<UpdatePostPayload, "postId">) => {
      await updatePost({ postId, ...data });
    },
    [updatePost]
  );

  const handleDelete = useCallback(
    async (postId: string) => {
      await deletePost({ postId });
    },
    [deletePost]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Notes</h2>
          <p className="text-sm text-slate-500">Create, edit, and delete your private notes.</p>
        </div>
        <button
          onClick={() => handleOpenAddBox(true)}
          className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700'
        >
          + Create Note
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        {loading ? "Syncing notes..." : `${posts.length} note${posts.length === 1 ? "" : "s"} available`}
      </div>

      <div>
        <Cardlayout posts={posts} loading={loading} error={error} onDelete={handleDelete} onUpdate={handleUpdate} />
        {openAddBox && <AddNote handleCLose={handleOpenAddBox} onCreate={handleCreate} loading={loading} error={error} />}
      </div>
    </div>
  );
}
