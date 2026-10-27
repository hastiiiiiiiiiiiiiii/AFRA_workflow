"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

import { formatRial } from "@/lib/mock/dashboard";

export default function MyTasks({
  tasks = [],
  title = "وظایف من",
  subtitle = "درخواست‌هایی که نیازمند اقدام شما هستند",
}) {
  return (
    <section
      className="
        overflow-hidden
        rounded-[14px]
        border border-[var(--afra-border)]
        bg-[var(--afra-surface)]
        shadow-[var(--afra-shadow-sm)]
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col gap-3
          border-b border-[var(--afra-border)]
          px-4 py-4
          sm:flex-row sm:items-center sm:justify-between
          sm:px-5
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-[10px]
              bg-[var(--afra-primary-soft)]
              text-[var(--afra-primary)]
            "
          >
            <ClipboardCheck size={17} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-[var(--afra-text-primary)]">
              {title}
            </h2>

            <p className="mt-1 text-[11px] text-[var(--afra-text-muted)]">
              {subtitle}
            </p>
          </div>
        </div>

        <Link
          href="/tasks"
          className="
            flex items-center gap-1
            self-start
            text-xs font-medium
            text-[var(--afra-primary)]
            hover:text-[var(--afra-primary-hover)]
          "
        >
          مشاهده همه
          <ArrowLeft size={14} strokeWidth={1.8} />
        </Link>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full
              bg-[var(--afra-surface-secondary)]
              text-[var(--afra-text-muted)]
            "
          >
            <ClipboardCheck size={19} strokeWidth={1.7} />
          </div>

          <p className="mt-3 text-sm font-medium text-[var(--afra-text-primary)]">
            وظیفه‌ای برای نمایش وجود ندارد
          </p>

          <p className="mt-1 text-xs text-[var(--afra-text-muted)]">
            در حال حاضر درخواست نیازمند اقدام شما وجود ندارد.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-[var(--afra-border)] bg-[var(--afra-surface-secondary)]">
                  <th className="px-5 py-3 text-right text-[11px] font-medium text-[var(--afra-text-muted)]">
                    درخواست
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-medium text-[var(--afra-text-muted)]">
                    پروژه
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-medium text-[var(--afra-text-muted)]">
                    تأمین‌کننده
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-medium text-[var(--afra-text-muted)]">
                    مبلغ
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-medium text-[var(--afra-text-muted)]">
                    مرحله
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-medium text-[var(--afra-text-muted)]">
                    اقدام
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="
                      border-b border-[var(--afra-border)]
                      last:border-b-0
                      hover:bg-[var(--afra-surface-hover)]
                    "
                  >
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-[var(--afra-primary)]">
                        {task.id}
                      </span>
                    </td>

                    <td className="max-w-[200px] px-5 py-4">
                      <p className="truncate text-xs font-medium text-[var(--afra-text-primary)]">
                        {task.project}
                      </p>
                    </td>

                    <td className="max-w-[180px] px-5 py-4">
                      <p className="truncate text-xs text-[var(--afra-text-secondary)]">
                        {task.supplier}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-xs font-medium text-[var(--afra-text-primary)]">
                        {formatRial(task.amount)}
                      </span>

                      <span className="mr-1 text-[10px] text-[var(--afra-text-muted)]">
                        ریال
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`
                            inline-flex items-center rounded-full
                            px-2.5 py-1
                            text-[10px] font-medium
                            ${
                              task.priorityType === "urgent"
                                ? "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]"
                                : "bg-[var(--afra-warning-soft)] text-[var(--afra-warning)]"
                            }
                          `}
                        >
                          {task.stage}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-left">
                      <Link
                        href={`/requests/${task.id}`}
                        className="
                          inline-flex items-center gap-1
                          text-[11px] font-medium
                          text-[var(--afra-primary)]
                          hover:text-[var(--afra-primary-hover)]
                        "
                      >
                        بررسی
                        <ArrowLeft size={13} strokeWidth={1.8} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-[var(--afra-border)] md:hidden">
            {tasks.map((task) => (
              <div key={task.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[var(--afra-primary)]">
                      {task.id}
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-[var(--afra-text-primary)]">
                      {task.project}
                    </h3>
                  </div>

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2.5 py-1
                      text-[10px] font-medium
                      ${
                        task.priorityType === "urgent"
                          ? "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]"
                          : "bg-[var(--afra-warning-soft)] text-[var(--afra-warning)]"
                      }
                    `}
                  >
                    {task.priority}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-[var(--afra-text-muted)]">
                      تأمین‌کننده
                    </p>

                    <p className="mt-1 truncate text-xs text-[var(--afra-text-secondary)]">
                      {task.supplier}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[var(--afra-text-muted)]">
                      مبلغ
                    </p>

                    <p className="mt-1 text-xs font-medium text-[var(--afra-text-primary)]">
                      {formatRial(task.amount)} ریال
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle
                      size={13}
                      className="text-[var(--afra-text-muted)]"
                    />

                    <span className="text-[10px] text-[var(--afra-text-secondary)]">
                      {task.stage}
                    </span>
                  </div>

                  <Link
                    href={`/requests/${task.id}`}
                    className="
                      inline-flex items-center gap-1
                      rounded-[8px]
                      bg-[var(--afra-primary)]
                      px-3 py-2
                      text-[10px] font-medium text-white
                      hover:bg-[var(--afra-primary-hover)]
                    "
                  >
                    بررسی درخواست
                    <ArrowLeft size={13} strokeWidth={1.8} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}