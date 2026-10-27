"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/login") {
      setChecking(false);
      return;
    }

    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        if (!result.ok || !result.data) {
          router.replace("/login");
          return;
        }
        setChecking(false);
      })
      .catch(() => {
        if (active) router.replace("/login");
      });
    return () => { active = false; };
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--afra-background)]">
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[11px] bg-[var(--afra-primary)] text-sm font-bold text-white">
            A
          </div>

          <p className="mt-4 text-xs text-[var(--afra-text-muted)]">
            در حال بررسی دسترسی...
          </p>
        </div>
      </div>
    );
  }

  return children;
}