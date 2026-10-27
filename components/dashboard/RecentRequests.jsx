"use client";

import Link from "next/link";
import {
  FileText,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";

import { formatRial } from "@/lib/mock/dashboard";

const statusStyles = {
  success:
    "bg-[var(--afra-success-soft)] text-[var(--afra-success)]",
  warning:
    "bg-[var(--afra-warning-soft)] text-[var(--afra-warning)]",
  danger:
    "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]",
  info:
    "bg-[var(--afra-info-soft)] text-[var(--afra-info)]",
};

export default function RecentRequests({ requests }) {
  return (
    <section className="overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
      <div className="flex items-center justify-between border-b border-[var(--afra-border)] px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
            <FileText size={17} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
              آخرین درخواست‌ها
            </h2>

            <p className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
              آخرین درخواست‌های ثبت‌شده در سامانه
            </p>
          </div>
        </div>

        <Link
          href="/requests"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--afra-primary)] hover:underline"
        >
          مشاهده همه
          <ChevronLeft size={13} />
        </Link>
      </div>

      <div className="divide-y divide-[var(--afra-border)]">
        {requests.map((request) => (
          <Link
            key={request.id}
            href={`/requests/${request.id}`}
            className="block px-4 py-4 transition-colors hover:bg-[var(--afra-surface-hover)] sm:px-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[var(--afra-surface-secondary)] text-[var(--afra-text-secondary)]">
                <FileText size={15} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[var(--afra-primary)]">
                    {request.id}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      statusStyles[request.statusType]
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <p className="mt-1.5 truncate text-xs font-medium text-[var(--afra-text-primary)]">
                  {request.project}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[var(--afra-text-muted)]">
                  <span>{request.supplier}</span>

                  <span>
                    {formatRial(request.amount)} ریال
                  </span>

                  <span>{request.date}</span>
                </div>
              </div>

              <ArrowLeft
                size={15}
                className="mt-1 shrink-0 text-[var(--afra-text-muted)]"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}