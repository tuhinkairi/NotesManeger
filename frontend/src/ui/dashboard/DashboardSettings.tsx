export default function DashboardSettings() {
  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-2xl font-semibold text-slate-900'>Settings</h2>
        <p className='text-sm text-slate-500'>General workspace preferences.</p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <section className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
          <h3 className='text-lg font-semibold text-slate-800'>Theme</h3>
          <p className='mt-1 text-sm text-slate-600'>Dashboard currently uses a clean light theme.</p>
        </section>

        <section className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
          <h3 className='text-lg font-semibold text-slate-800'>Sync</h3>
          <p className='mt-1 text-sm text-slate-600'>Changes are synced through your protected API routes.</p>
        </section>
      </div>
    </div>
  );
}
