import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppShell from "@/components/layout/AppShell";
import PageTransition from "@/components/layout/PageTransition";

export default function CommandLayout({ children }) {
  return (
    <ProtectedRoute>
      <AppShell>
        <PageTransition>{children}</PageTransition>
      </AppShell>
    </ProtectedRoute>
  );
}