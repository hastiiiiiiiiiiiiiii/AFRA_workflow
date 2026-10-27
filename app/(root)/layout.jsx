import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import AuthGuard from "@/components/auth/AuthGuard";

export default function RootLayout({ children }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[var(--afra-background)] text-[var(--afra-text-primary)]">
        <Sidebar />

        <div className="min-h-screen lg:pr-[248px]">
          <Header />

          <main className="min-h-[calc(100vh-76px)] pb-[84px] lg:pb-0">
            {children}
          </main>
        </div>

        <MobileNav />
      </div>
    </AuthGuard>
  );
}