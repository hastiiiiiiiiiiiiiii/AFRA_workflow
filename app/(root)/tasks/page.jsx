"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


const stageStyles = {
  warning:
    "bg-[var(--afra-warning-soft)] text-[var(--afra-warning)]",
  info:
    "bg-[var(--afra-info-soft)] text-[var(--afra-info)]",
};

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => { fetch("/api/tasks", {cache:"no-store"}).then(r=>r.json()).then(j=>j.ok&&setTasks(j.data)).catch(()=>{}); }, []);
  const [filter, setFilter] = useState("all");
  const taskSummary = { total: tasks.length, urgent: tasks.filter(t=>t.stageType==="warning").length, review: tasks.filter(t=>t.stageType==="info").length };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.id.toLowerCase().includes(search.toLowerCase()) ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.supplier.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "urgent" && task.stageType === "warning") ||
      (filter === "review" && task.stageType === "info");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-medium text-[var(--afra-primary)]">
          مدیریت فرآیند
        </p>

        <h1 className="mt-1 text-xl font-bold sm:text-2xl">
          وظایف من
        </h1>

        <p className="mt-1 text-xs text-[var(--afra-text-secondary)]">
          درخواست‌هایی که در حال حاضر نیازمند اقدام شما هستند.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

        <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
          <div className="text-[10px] text-[var(--afra-text-muted)]">
            کل وظایف
          </div>

          <div className="mt-2 text-2xl font-bold">
            {taskSummary.total}
          </div>

          <div className="mt-1 text-[10px] text-[var(--afra-text-secondary)]">
            نیازمند اقدام
          </div>
        </div>

        <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
          <div className="text-[10px] text-[var(--afra-text-muted)]">
            اقدامات فوری
          </div>

          <div className="mt-2 text-2xl font-bold text-[var(--afra-warning)]">
            {taskSummary.urgent}
          </div>

          <div className="mt-1 text-[10px] text-[var(--afra-text-secondary)]">
            منتظر اقدام
          </div>
        </div>

        <div className="col-span-2 rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)] sm:col-span-1">
          <div className="text-[10px] text-[var(--afra-text-muted)]">
            موارد بررسی
          </div>

          <div className="mt-2 text-2xl font-bold text-[var(--afra-info)]">
            {taskSummary.review}
          </div>

          <div className="mt-1 text-[10px] text-[var(--afra-text-secondary)]">
            در مرحله بررسی
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-col gap-3 rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 sm:flex-row">

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="جستجو بر اساس شماره، پروژه یا تأمین‌کننده..."
          className="h-10 flex-1 rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-xs outline-none placeholder:text-[var(--afra-text-muted)] focus:border-[var(--afra-primary)]"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-10 rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-xs text-[var(--afra-text-secondary)] outline-none focus:border-[var(--afra-primary)]"
        >
          <option value="all">همه وظایف</option>
          <option value="urgent">نیازمند اقدام</option>
          <option value="review">در حال بررسی</option>
        </select>

      </div>

      {/* Desktop / Tablet Table */}
      <div className="mt-5 hidden overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)] md:block">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right">

            <thead>
              <tr className="border-b border-[var(--afra-border)] bg-[var(--afra-surface-secondary)]">

                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                  شماره
                </th>

                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                  درخواست
                </th>

                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                  تأمین‌کننده
                </th>

                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                  مبلغ
                </th>

                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                  مرحله
                </th>

                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                  تاریخ
                </th>

                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                  عملیات
                </th>

              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-[var(--afra-border)] last:border-0 hover:bg-[var(--afra-surface-hover)]"
                >

                  <td className="px-4 py-4 text-xs font-bold text-[var(--afra-primary)]">
                    #{task.id}
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-xs font-bold">
                      {task.title}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-xs text-[var(--afra-text-secondary)]">
                    {task.supplier}
                  </td>

                  <td className="px-4 py-4 text-xs font-bold">
                    {task.amount}
                    <span className="mr-1 text-[9px] font-normal text-[var(--afra-text-muted)]">
                      ریال
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${stageStyles[task.stageType]}`}
                    >
                      {task.stage}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-[10px] text-[var(--afra-text-secondary)]">
                    {task.date}
                  </td>

                  <td className="px-4 py-4">
                    <Link
                      href={`/requests/${task.id}/${task.action === "PAYMENT_COMPLETE" ? "payment" : task.action === "PAYMENT_VERIFY" ? "payment-verification" : task.action === "FINAL_REVIEW_APPROVE" ? "final-review" : task.action === "FINAL_APPROVE" ? "final-approval" : ""}`.replace(/\/$/, "")}
                      className="inline-flex rounded-[8px] bg-[var(--afra-primary)] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[var(--afra-primary-hover)]"
                    >
                      {task.action}
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="py-16 text-center text-xs text-[var(--afra-text-muted)]">
            وظیفه‌ای پیدا نشد.
          </div>
        )}

      </div>

      {/* Mobile Cards */}
      <div className="mt-5 space-y-3 md:hidden">

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]"
          >

            <div className="flex items-start justify-between gap-3">

              <div>
                <div className="text-[10px] font-bold text-[var(--afra-primary)]">
                  #{task.id}
                </div>

                <h2 className="mt-1 text-xs font-bold">
                  {task.title}
                </h2>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-medium ${stageStyles[task.stageType]}`}
              >
                {task.stage}
              </span>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--afra-border)] pt-4">

              <div>
                <div className="text-[9px] text-[var(--afra-text-muted)]">
                  تأمین‌کننده
                </div>

                <div className="mt-1 text-[10px] font-medium">
                  {task.supplier}
                </div>
              </div>

              <div>
                <div className="text-[9px] text-[var(--afra-text-muted)]">
                  مبلغ
                </div>

                <div className="mt-1 text-[10px] font-bold">
                  {task.amount} ریال
                </div>
              </div>

              <div>
                <div className="text-[9px] text-[var(--afra-text-muted)]">
                  تاریخ
                </div>

                <div className="mt-1 text-[10px]">
                  {task.date}
                </div>
              </div>

            </div>

            <Link
              href={`/requests/${task.id}/${task.action === "PAYMENT_COMPLETE" ? "payment" : task.action === "PAYMENT_VERIFY" ? "payment-verification" : task.action === "FINAL_REVIEW_APPROVE" ? "final-review" : task.action === "FINAL_APPROVE" ? "final-approval" : ""}`.replace(/\/$/, "")}
              className="mt-4 flex h-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary)] text-[10px] font-bold text-white hover:bg-[var(--afra-primary-hover)]"
            >
              {task.action}
            </Link>

          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] py-16 text-center text-xs text-[var(--afra-text-muted)]">
            وظیفه‌ای پیدا نشد.
          </div>
        )}

      </div>

    </div>
  );
}