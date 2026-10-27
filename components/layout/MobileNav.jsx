"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "داشبورد",
    href: "/dashboard",
    icon: "▦",
  },
  {
    label: "درخواست‌ها",
    href: "/requests",
    icon: "▤",
  },
  {
    label: "وظایف",
    href: "/tasks",
    icon: "✓",
  },
  {
    label: "گزارش‌ها",
    href: "/reports",
    icon: "◫",
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <nav
      className="
        fixed bottom-0 right-0 left-0 z-50
        border-t border-[var(--afra-border)]
        bg-[var(--afra-surface)]/95
        backdrop-blur-md
        lg:hidden
      "
    >
      <div
        className="
          mx-auto flex h-[68px] max-w-lg
          items-center justify-around
          px-2
        "
      >
        {navigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                flex min-w-[64px] flex-col items-center
                gap-1 rounded-[10px] px-2 py-1.5
              "
            >
              <span
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-lg text-sm",
                  active
                    ? "bg-[var(--afra-primary)] text-white"
                    : "text-[var(--afra-text-muted)]",
                ].join(" ")}
              >
                {item.icon}
              </span>

              <span
                className={[
                  "text-[9px] font-medium",
                  active
                    ? "text-[var(--afra-primary)]"
                    : "text-[var(--afra-text-muted)]",
                ].join(" ")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}