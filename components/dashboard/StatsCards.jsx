"use client";

import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock3,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";

const cards = [
  {
    key: "totalRequests",
    title: "کل درخواست‌ها",
    description: "تمام درخواست‌های ثبت‌شده",
    icon: FileText,
    href: "/requests",
    type: "default",
  },
  {
    key: "completed",
    title: "تکمیل‌شده",
    description: "درخواست‌های نهایی‌شده",
    icon: CheckCircle2,
    href: "/requests?status=completed",
    type: "success",
  },
  {
    key: "inReview",
    title: "در حال بررسی",
    description: "درخواست‌های در جریان",
    icon: Clock3,
    href: "/tasks",
    type: "info",
  },
  {
    key: "returned",
    title: "برگشت‌خورده",
    description: "نیازمند اصلاح",
    icon: RotateCcw,
    href: "/requests?status=returned",
    type: "danger",
  },
];

const iconStyles = {
  default: {
    wrapper:
      "bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]",
  },
  success: {
    wrapper:
      "bg-[var(--afra-success-soft)] text-[var(--afra-success)]",
  },
  info: {
    wrapper:
      "bg-[var(--afra-info-soft)] text-[var(--afra-info)]",
  },
  danger: {
    wrapper:
      "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]",
  },
};

export default function StatsCards({ stats = {} }) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = Number(stats?.[card.key] ?? 0);
        const styles = iconStyles[card.type];

        return (
          <Link
            key={card.key}
            href={card.href}
            className="
              group
              rounded-[14px]
              border border-[var(--afra-border)]
              bg-[var(--afra-surface)]
              p-4
              shadow-[var(--afra-shadow-sm)]
              transition-colors
              hover:border-[var(--afra-border-strong)]
              hover:bg-[var(--afra-surface-hover)]
              sm:p-5
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-[10px]
                  ${styles.wrapper}
                `}
              >
                <Icon size={17} strokeWidth={1.8} />
              </div>

              <ArrowLeft
                size={15}
                strokeWidth={1.8}
                className="
                  mt-1
                  text-[var(--afra-text-muted)]
                  opacity-0
                  transition-opacity
                  group-hover:opacity-100
                "
              />
            </div>

            <p className="mt-4 text-xs font-medium text-[var(--afra-text-secondary)]">
              {card.title}
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                tracking-tight
                text-[var(--afra-text-primary)]
                sm:text-[26px]
              "
            >
              {value.toLocaleString("fa-IR")}
            </p>

            <p className="mt-1 truncate text-[10px] text-[var(--afra-text-muted)]">
              {card.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}