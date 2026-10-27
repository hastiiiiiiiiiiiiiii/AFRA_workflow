"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";

import { ROLE_INFO } from "@/lib/constants/roles";

export default function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((result) => setUser(result.ok ? result.data : null))
      .catch(() => setUser(null));
  }, []);

  const roleInfo = user?.roleKey ? ROLE_INFO[user.roleKey] : null;

  const userName = user?.name || "کاربر";
  const userRole = roleInfo?.label || user?.role || "کاربر سامانه";

  const userInitial = userName.charAt(0);

  return (
    <header
      className="
        sticky top-0 z-30
        h-[76px]
        border-b border-[var(--afra-border)]
        bg-[var(--afra-surface)]/95
        backdrop-blur-md
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Brand */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-[9px]
                bg-[var(--afra-primary)]
                text-xs font-bold text-white
              "
            >
              A
            </div>

            <div className="text-sm font-bold text-[var(--afra-text-primary)]">
              AFRA
            </div>
          </div>

          {/* Desktop Description */}
          <div className="hidden lg:block">
            <p className="text-xs text-[var(--afra-text-muted)]">
              سامانه مدیریت فرآیندهای داخلی
            </p>
          </div>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setNotificationsOpen((value) => !value)
              }
              className="
                relative flex h-10 w-10 items-center justify-center
                rounded-[10px]
                border border-[var(--afra-border)]
                bg-[var(--afra-surface)]
                text-[var(--afra-text-secondary)]
                transition-colors
                hover:bg-[var(--afra-surface-secondary)]
                hover:text-[var(--afra-text-primary)]
              "
              aria-label="اعلان‌ها"
            >
              <Bell size={17} strokeWidth={1.8} />

              <span
                className="
                  absolute right-2 top-2
                  h-1.5 w-1.5
                  rounded-full
                  bg-[var(--afra-danger)]
                "
              />
            </button>

            {notificationsOpen && (
              <div
                className="
                  absolute left-0 top-12
                  w-[300px]
                  overflow-hidden
                  rounded-[14px]
                  border border-[var(--afra-border)]
                  bg-[var(--afra-surface)]
                  shadow-[var(--afra-shadow-md)]
                "
              >
                <div className="border-b border-[var(--afra-border)] px-4 py-3">
                  <div className="text-sm font-bold text-[var(--afra-text-primary)]">
                    اعلان‌ها
                  </div>

                  <div className="mt-1 text-[11px] text-[var(--afra-text-muted)]">
                    اعلان‌های اخیر سامانه
                  </div>
                </div>

                <div className="p-3">
                  <div className="rounded-[10px] bg-[var(--afra-surface-secondary)] p-3">
                    <div className="text-xs font-bold text-[var(--afra-text-primary)]">
                      یک درخواست جدید منتظر بررسی شماست.
                    </div>

                    <div className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                      چند دقیقه پیش
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User */}
          <button
            type="button"
            className="
              flex items-center gap-2.5
              rounded-[10px]
              border border-transparent
              px-2 py-1.5
              hover:border-[var(--afra-border)]
              hover:bg-[var(--afra-surface-secondary)]
            "
          >
            {/* Avatar */}
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                bg-[var(--afra-primary-soft)]
                text-xs font-bold
                text-[var(--afra-primary)]
              "
            >
              {userInitial}
            </div>

            {/* User Info */}
            <div className="hidden text-right sm:block">
              <div className="text-xs font-bold text-[var(--afra-text-primary)]">
                {userName}
              </div>

              <div className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
                {userRole}
              </div>
            </div>

            <ChevronDown
              size={15}
              strokeWidth={1.8}
              className="text-[var(--afra-text-muted)]"
            />
          </button>
        </div>
      </div>
    </header>
  );
}