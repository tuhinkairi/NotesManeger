import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/user/useUser";

export default function DashboardProfile() {
  const navigate = useNavigate();
  const { userInfo, updateUser, deleteUser, loading, error } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  useEffect(() => {
    setName((userInfo?.data?.name as string) || "");
    setEmail((userInfo?.data?.email as string) || "");
  }, [userInfo?.data?.name, userInfo?.data?.email]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitMessage(null);

    const payload: { name?: string; email?: string; password?: string } = {};
    if (name.trim()) payload.name = name.trim();
    if (email.trim()) payload.email = email.trim();
    if (password.trim()) payload.password = password.trim();

    if (!Object.keys(payload).length) {
      setSubmitError("Please provide at least one field.");
      return;
    }

    try {
      const resp = await updateUser(payload);
      setSubmitMessage(resp.message || "Profile updated");
      setPassword("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      setSubmitError(message);
    }
  }

  async function handleDelete() {
    setSubmitError(null);
    setSubmitMessage(null);
    try {
      await deleteUser();
      navigate("/auth/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setSubmitError(message);
    }
  }

  return (
    <div className='mx-auto max-w-2xl space-y-4'>
      <div>
        <h2 className='text-2xl font-semibold text-slate-900'>Profile</h2>
        <p className='text-sm text-slate-500'>Update account details and credentials.</p>
      </div>

      <form onSubmit={handleUpdate} className='space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5'>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full rounded-lg border border-slate-300 px-3 py-2'
            placeholder='Your name'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full rounded-lg border border-slate-300 px-3 py-2'
            placeholder='Your email'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>New Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full rounded-lg border border-slate-300 px-3 py-2'
            placeholder='Leave empty to keep current'
          />
        </div>

        {(submitError || error) && <p className='text-sm text-red-600'>{submitError || error}</p>}
        {submitMessage && <p className='text-sm text-green-600'>{submitMessage}</p>}

        <div className='flex justify-between items-center'>
          <button
            type='button'
            onClick={handleDelete}
            className='rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60'
            disabled={loading}
          >
            {loading ? "Please wait..." : "Delete Account"}
          </button>
          <button
            type='submit'
            className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60'
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
