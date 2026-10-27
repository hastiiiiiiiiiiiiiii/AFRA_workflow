"use client";

import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";

const configs = {
  success: {
    icon: CheckCircle2,
    iconClass:
      "bg-[var(--afra-success-soft)] text-[var(--afra-success)]",
  },
  info: {
    icon: BarChart3,
    iconClass:
      "bg-[var(--afra-info-soft)] text-[var(--afra-info)]",
  },
  warning: {
    icon: Clock3,
    iconClass:
      "bg-[var(--afra-warning-soft)] text-[var(--afra-warning)]",
  },
  danger: {
    icon: RotateCcw,
    iconClass:
      "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]",
  },
};

export default function RequestOverview({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
            وضعیت درخواست‌ها
          </h2>

          <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
            نمای کلی وضعیت فعلی درخواست‌ها
          </p>
        </div>

        <Link
          href="/requests"
          className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--afra-primary)] hover:underline"
        >
          همه درخواست‌ها
          <ChevronLeft size={12} />
        </Link>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const config = configs[item.type] || configs.info;
          const Icon = config.icon;
          const percentage = total
            ? (item.value / total) * 100
            : 0;

          return (
            <div key={item.label}>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] ${config.iconClass}`}
                >
                  <Icon size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[var(--afra-text-secondary)]">
                      {item.label}
                    </span>

                    <span className="text-xs font-semibold text-[var(--afra-text-primary)]">
                      {item.value.toLocaleString("fa-IR")}
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--afra-surface-secondary)]">
                    <div
                      className="h-full rounded-full bg-[var(--afra-primary)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}