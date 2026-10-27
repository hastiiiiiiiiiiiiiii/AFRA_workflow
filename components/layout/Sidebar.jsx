"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  BarChart3,
  Activity,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";

import { getCurrentUser, logoutUser } from "@/lib/auth/session";
import {
  PERMISSIONS,
  ROLE_INFO,
} from "@/lib/constants/roles";
import { can } from "@/lib/auth/permissions";

const menuGroups = [
  {
    title: "اصلی",
    items: [
      {
        label: "داشبورد",
        href: "/dashboard",
        icon: LayoutDashboard,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
      {
        label: "درخواست‌ها",
        href: "/requests",
        icon: FileText,
        permission: PERMISSIONS.VIEW_REQUESTS,
      },
      {
        label: "وظایف من",
        href: "/tasks",
        icon: ClipboardCheck,
        permission: PERMISSIONS.VIEW_TASKS,
      },
    ],
  },

  {
    title: "مدیریت",
    items: [
      {
        label: "گزارش‌ها",
        href: "/reports",
        icon: BarChart3,
        permission: PERMISSIONS.VIEW_REPORTS,
      },
      {
        label: "فعالیت‌ها",
        href: "/activity",
        icon: Activity,
        permission: PERMISSIONS.VIEW_ACTIVITY,
      },
      {
        label: "کاربران",
        href: "/users",
        icon: Users,
        permission: PERMISSIONS.MANAGE_USERS,
      },
    ],
  },

  {
    title: "حساب کاربری",
    items: [
      {
        label: "تنظیمات",
        href: "/settings",
        icon: Settings,
        permission: PERMISSIONS.VIEW_SETTINGS,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const roleInfo = user?.roleKey
    ? ROLE_INFO[user.roleKey]
    : null;

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <aside className="fixed right-0 top-0 z-40 hidden h-screen w-[248px] border-l border-[var(--afra-border)] bg-[var(--afra-surface)] lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-[76px] shrink-0 items-center border-b border-[var(--afra-border)] px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--afra-primary)] text-sm font-bold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-bold text-[var(--afra-text-primary)]">
              افرا
            </p>

            <p className="text-[10px] text-[var(--afra-text-muted)]">
              سامانه داخلی
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-6">
          {menuGroups.map((group) => {
            const visibleItems = group.items.filter((item) =>
              can(item.permission)
            );

            if (visibleItems.length === 0) {
              return null;
            }

            return (
              <div key={group.title}>
                <p className="mb-2 px-3 text-[10px] font-semibold text-[var(--afra-text-muted)]">
                  {group.title}
                </p>

                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center gap-3 rounded-[9px] px-3 py-2.5 text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]"
                            : "text-[var(--afra-text-secondary)] hover:bg-[var(--afra-surface-hover)] hover:text-[var(--afra-text-primary)]"
                        }`}
                      >
                        <Icon
                          className={`h-[17px] w-[17px] shrink-0 ${
                            isActive
                              ? "text-[var(--afra-primary)]"
                              : "text-[var(--afra-text-muted)] group-hover:text-[var(--afra-text-secondary)]"
                          }`}
                        />

                        <span className="flex-1">
                          {item.label}
                        </span>

                        {isActive && (
                          <ChevronLeft className="h-3.5 w-3.5" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-[var(--afra-border)] p-3">
        <div className="flex items-center gap-3 rounded-[10px] bg-[var(--afra-surface-secondary)] px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--afra-primary)] text-xs font-bold text-white">
            {user?.name?.charAt(0) || "ک"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[var(--afra-text-primary)]">
              {user?.name || "کاربر"}
            </p>

            <p className="mt-0.5 truncate text-[10px] text-[var(--afra-text-muted)]">
              {roleInfo?.label || user?.role || "کاربر سامانه"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="خروج"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] text-[var(--afra-text-muted)] transition-colors hover:bg-[var(--afra-danger-soft)] hover:text-[var(--afra-danger)]"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}