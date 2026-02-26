import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../hooks/user/useUser";

export default function DashboardLayout() {
  const { userInfo } = useUser();

  const links = [
    { to: "", label: "Home" },
    { to: "notes", label: "Notes" },
    { to: "profile", label: "Profile" },
    { to: "settings", label: "Settings" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Notes Manager</p>
              <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
              <p className="text-xs text-slate-500">Signed in as</p>
              <p className="text-sm font-semibold text-slate-800">
                {userInfo?.data?.name ? String(userInfo.data.name) : "User"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === ""}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <section className="min-h-[70vh] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
}
