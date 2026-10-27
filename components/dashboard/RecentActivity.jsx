"use client";

import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  CreditCard,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";

const icons = {
  success: CheckCircle2,
  payment: CreditCard,
  danger: RotateCcw,
};

export default function RecentActivity({ activities }) {
  return (
    <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
            <Activity size={17} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
              فعالیت‌های اخیر
            </h2>

            <p className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
              آخرین رویدادهای ثبت‌شده
            </p>
          </div>
        </div>

        <Link
          href="/activity"
          className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--afra-primary)] hover:underline"
        >
          همه فعالیت‌ها
          <ChevronLeft size={12} />
        </Link>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = icons[activity.type] || Activity;

          return (
            <div key={activity.id} className="relative flex gap-3">
              {index !== activities.length - 1 && (
                <div className="absolute right-[15px] top-8 h-[calc(100%+12px)] w-px bg-[var(--afra-border)]" />
              )}

              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--afra-surface-secondary)] text-[var(--afra-text-secondary)]">
                <Icon size={14} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-[var(--afra-text-primary)]">
                      {activity.action}
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-[var(--afra-text-muted)]">
                      {activity.description}
                    </p>

                    <p className="mt-1 text-[10px] text-[var(--afra-text-secondary)]">
                      توسط {activity.user}
                    </p>
                  </div>

                  <span className="shrink-0 text-[10px] text-[var(--afra-text-muted)]">
                    {activity.time}
                  </span>
                </div>

                {activity.requestId && (
                  <Link
                    href={`/requests/${activity.requestId}`}
                    className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-[var(--afra-primary)] hover:underline"
                  >
                    {activity.requestId}
                    <ChevronLeft size={11} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}