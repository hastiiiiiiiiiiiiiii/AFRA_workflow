"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


const statusStyles = {
    warning:
        "bg-[var(--afra-warning-soft)] text-[var(--afra-warning)]",
    success:
        "bg-[var(--afra-success-soft)] text-[var(--afra-success)]",
    info:
        "bg-[var(--afra-info-soft)] text-[var(--afra-info)]",
    danger:
        "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]",
};

export default function RequestsPage() {
    const [search, setSearch] = useState("");
    const [requests, setRequests] = useState([]);
    useEffect(() => { fetch("/api/requests", {cache:"no-store"}).then(r=>r.json()).then(j=>j.ok&&setRequests(j.data)).catch(()=>{}); }, []);

    const filteredRequests = requests.filter((request) => {
        const value = search.toLowerCase();

        return (
            request.id.toLowerCase().includes(value) ||
            request.project.toLowerCase().includes(value) ||
            request.supplier.toLowerCase().includes(value)
        );
    });

    return (
        <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[11px] font-medium text-[var(--afra-primary)]">
                        مدیریت فرآیند
                    </p>

                    <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                        درخواست‌ها
                    </h1>

                    <p className="mt-1 text-xs text-[var(--afra-text-secondary)]">
                        مشاهده و پیگیری تمام درخواست‌های ثبت‌شده
                    </p>
                </div>

                <Link
                    href="/requests/new"
                    className="rounded-[10px] bg-[var(--afra-primary)] px-4 py-2.5 text-xs font-bold text-white hover:bg-[var(--afra-primary-hover)]"
                >
                    + ثبت درخواست جدید
                </Link>
            </div>

            {/* Filters */}
            <div
                className="
          mt-6 flex flex-col gap-3
          rounded-[14px]
          border border-[var(--afra-border)]
          bg-[var(--afra-surface)]
          p-4
          sm:flex-row
        "
            >
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="جستجو بر اساس شماره، پروژه یا تأمین‌کننده..."
                    className="
            h-10 flex-1 rounded-[9px]
            border border-[var(--afra-border)]
            bg-[var(--afra-surface)]
            px-3 text-xs
            outline-none
            placeholder:text-[var(--afra-text-muted)]
            focus:border-[var(--afra-primary)]
          "
                />

                <select
                    className="
            h-10 rounded-[9px]
            border border-[var(--afra-border)]
            bg-[var(--afra-surface)]
            px-3 text-xs
            text-[var(--afra-text-secondary)]
            outline-none
          "
                >
                    <option>همه وضعیت‌ها</option>
                    <option>در انتظار بررسی</option>
                    <option>در حال پرداخت</option>
                    <option>در بررسی نهایی</option>
                    <option>تکمیل‌شده</option>
                    <option>برگشت‌خورده</option>
                </select>
            </div>

            {/* Table */}
            <div
                className="
          mt-5 overflow-hidden
          rounded-[14px]
          border border-[var(--afra-border)]
          bg-[var(--afra-surface)]
          shadow-[var(--afra-shadow-sm)]
        "
            >
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-right">
                        <thead>
                            <tr className="border-b border-[var(--afra-border)] bg-[var(--afra-surface-secondary)]">
                                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                                    شماره
                                </th>
                                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                                    پروژه
                                </th>
                                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                                    تأمین‌کننده
                                </th>
                                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                                    مبلغ
                                </th>
                                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                                    تاریخ
                                </th>
                                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                                    وضعیت
                                </th>
                                <th className="px-4 py-3 text-[10px] font-bold text-[var(--afra-text-muted)]">
                                    عملیات
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="border-b border-[var(--afra-border)] last:border-0 hover:bg-[var(--afra-surface-hover)]"
                                >
                                    <td className="px-4 py-4 text-xs font-bold text-[var(--afra-primary)]">
                                        #{request.id}
                                    </td>

                                    <td className="px-4 py-4 text-xs font-medium">
                                        {request.project}
                                    </td>

                                    <td className="px-4 py-4 text-xs text-[var(--afra-text-secondary)]">
                                        {request.supplier}
                                    </td>

                                    <td className="px-4 py-4 text-xs font-bold">
                                        {request.amount}
                                        <span className="mr-1 text-[9px] font-normal text-[var(--afra-text-muted)]">
                                            ریال
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-[11px] text-[var(--afra-text-secondary)]">
                                        {request.date}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${statusStyles[request.statusType]}`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <Link
                                            href={`/requests/${request.id}`}
                                            className="
                        rounded-[8px]
                        border border-[var(--afra-border)]
                        px-3 py-1.5
                        text-[10px] font-bold
                        hover:bg-[var(--afra-surface-secondary)]
                      "
                                        >
                                            مشاهده
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredRequests.length === 0 && (
                    <div className="py-16 text-center text-xs text-[var(--afra-text-muted)]">
                        نتیجه‌ای پیدا نشد.
                    </div>
                )}
            </div>
        </div>
    );
}