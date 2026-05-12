import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen text-white">
      <div className="fixed inset-0 -z-20 bg-slate-950" />
      <div className="fixed inset-0 -z-10 grid-bg opacity-35" />
      <div className="fixed left-1/3 top-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="fixed bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <Sidebar />

      <main className="min-h-screen px-4 py-4 lg:ml-80 lg:px-6">
        <Topbar />
        {children}
      </main>
    </div>
  );
}