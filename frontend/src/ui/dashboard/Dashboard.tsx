export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
        <p className="text-sm text-slate-500">Manage your notes, profile, and app settings.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Workspace</p>
          <p className="mt-2 text-lg font-semibold text-slate-800">Personal Notes</p>
          <p className="mt-1 text-sm text-slate-600">Create and organize quick thoughts with edit and search support.</p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Profile</p>
          <p className="mt-2 text-lg font-semibold text-slate-800">Account Controls</p>
          <p className="mt-1 text-sm text-slate-600">Update your name, email, and password from one place.</p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2 lg:col-span-1">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Security</p>
          <p className="mt-2 text-lg font-semibold text-slate-800">Token Based Auth</p>
          <p className="mt-1 text-sm text-slate-600">Protected routes and API actions are active with auth middleware.</p>
        </article>
      </div>
    </div>
  );
}
