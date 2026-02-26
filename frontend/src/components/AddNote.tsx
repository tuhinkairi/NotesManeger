import { useState } from "react";
import type { CreatePostPayload } from "../hooks/post";

type AddNoteProps = {
    handleCLose: (arg: boolean) => void;
    onCreate: (payload: CreatePostPayload) => Promise<void>;
    loading: boolean;
    error: string | null;
};

export default function AddNote({ handleCLose, onCreate, loading, error }: AddNoteProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitError, setSubmitError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitError(null);

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            setSubmitError("Title and content are required.");
            return;
        }

        try {
            await onCreate({ title: trimmedTitle, content: trimmedContent });
            handleCLose(false);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to add note";
            setSubmitError(message);
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4'>
            <form onSubmit={handleSubmit} className='w-full max-w-lg space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg'>
                <div>
                    <h3 className='text-xl font-semibold text-slate-900'>Create Note</h3>
                    <p className='text-sm text-slate-500'>Add title and content to save a new note.</p>
                </div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2'
                    placeholder='Note title'
                />
                <textarea
                    cols={30}
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2'
                    placeholder='Write your note here'
                />
                {(submitError || error) && (
                    <p className='text-sm text-red-600'>{submitError || error}</p>
                )}
                <div className='flex justify-end gap-2'>
                    <button
                        type="button"
                        onClick={() => handleCLose(false)}
                        className='rounded-lg border border-slate-300 px-4 py-2 text-sm'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className='rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-60'
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
}
