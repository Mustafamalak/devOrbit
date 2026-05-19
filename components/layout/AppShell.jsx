"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import CommandPalette from "@/components/layout/CommandPalette";

export default function AppShell({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    function handleShortcut(event) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const shortcutPressed = isMac
        ? event.metaKey && event.key.toLowerCase() === "k"
        : event.ctrlKey && event.key.toLowerCase() === "k";

      if (shortcutPressed) {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="fixed inset-0 -z-20 bg-slate-950" />
      <div className="fixed inset-0 -z-10 grid-bg opacity-35" />
      <div className="fixed left-1/3 top-10 -z-10 h-72 w-72 rounded-full bg-pink-500/12 blur-3xl" />
      <div className="fixed bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="fixed right-1/4 top-1/3 -z-10 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

      <Sidebar />

      <MobileSidebar
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      <main className="min-h-screen px-4 py-4 lg:ml-80 lg:px-6">
        <Topbar
          onMenuClick={() => setMobileNavOpen(true)}
          onCommandClick={() => setCommandOpen(true)}
        />
        {children}
      </main>
    </div>
  );
}