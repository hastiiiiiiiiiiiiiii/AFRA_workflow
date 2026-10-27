"use client";

import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  RotateCcw,
  WalletCards,
  TrendingUp,
  Building2,
  Users,
  FileText,
  ChevronLeft,
  Download,
} from "lucide-react";

import { useEffect, useState } from "react";

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

function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-[var(--afra-text-muted)]">
            {title}
          </p>

          <p className="mt-2 truncate text-2xl font-bold tracking-tight text-[var(--afra-text-primary)]">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-[var(--afra-text-muted)]">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
        <Icon size={17} />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
          {title}
        </h2>

        <p className="mt-0.5 text-[11px] text-[var(--afra-text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ type, children }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
        statusStyles[type] || statusStyles.info
      }`}
    >
      {children}
    </span>
  );
}

export default function ReportsPage() {
  const [report,setReport]=useState({summary:{total:0,completed:0,totalAmount:0},statusDistribution:[],monthlyReport:[],departmentReport:[],topSuppliers:[],recentReportRequests:[]});
  useEffect(()=>{fetch("/api/reports",{cache:"no-store"}).then(r=>r.json()).then(j=>j.ok&&setReport(j.data)).catch(()=>{});},[]);
  const {summary:reportSummary,statusDistribution,monthlyReport,departmentReport,topSuppliers,recentReportRequests}=report;
  const formatRial=(v)=>new Intl.NumberFormat("fa-IR").format(Number(v||0));
  const maxMonthlyAmount = Math.max(
    ...monthlyReport.map((item) => item.amount)
  );

  const maxDepartmentAmount = Math.max(
    ...departmentReport.map((item) => item.amount)
  );

  const totalStatusCount = statusDistribution.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[var(--afra-text-muted)]">
            <Link
              href="/"
              className="transition-colors hover:text-[var(--afra-primary)]"
            >
              داشبورد
            </Link>

            <ChevronLeft size={13} />

            <span>گزارش‌ها</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--afra-text-primary)]">
            گزارش‌ها
          </h1>

          <p className="mt-1 text-sm text-[var(--afra-text-secondary)]">
            نمای کلی از درخواست‌ها، پرداخت‌ها و عملکرد فرآیندها
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[var(--afra-primary)] px-4 text-xs font-medium text-white transition-colors hover:bg-[var(--afra-primary-hover)]"
        >
          <Download size={16} />
          خروجی گزارش
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-6">
        <SummaryCard
          icon={FileText}
          title="کل درخواست‌ها"
          value={reportSummary.totalRequests.toLocaleString("fa-IR")}
          description="در بازه گزارش"
        />

        <SummaryCard
          icon={CheckCircle2}
          title="تکمیل‌شده"
          value={reportSummary.completedRequests.toLocaleString("fa-IR")}
          description="فرآیند کامل"
        />

        <SummaryCard
          icon={Clock3}
          title="در انتظار"
          value={reportSummary.pendingRequests.toLocaleString("fa-IR")}
          description="در حال پردازش"
        />

        <SummaryCard
          icon={RotateCcw}
          title="برگشت‌خورده"
          value={reportSummary.returnedRequests.toLocaleString("fa-IR")}
          description="نیازمند اصلاح"
        />

        <SummaryCard
          icon={WalletCards}
          title="مبلغ کل"
          value={`${formatRial(reportSummary.totalAmount)} ریال`}
          description="مجموع درخواست‌ها"
        />

        <SummaryCard
          icon={TrendingUp}
          title="مبلغ پرداخت‌شده"
          value={`${formatRial(reportSummary.paidAmount)} ریال`}
          description="پرداخت ثبت‌شده"
        />
      </div>

      {/* Main analytics */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Monthly chart */}
        <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)] xl:col-span-2">
          <SectionHeader
            icon={BarChart3}
            title="روند ماهانه درخواست‌ها"
            description="مقایسه تعداد درخواست‌ها و مبلغ آن‌ها"
          />

          <div className="space-y-5">
            {monthlyReport.map((item) => {
              const width =
                (item.amount / maxMonthlyAmount) * 100;

              return (
                <div key={item.month}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="w-14 text-xs font-medium text-[var(--afra-text-secondary)]">
                      {item.month}
                    </span>

                    <div className="flex items-center gap-4 text-[11px] text-[var(--afra-text-muted)]">
                      <span>
                        {item.requests.toLocaleString("fa-IR")} درخواست
                      </span>

                      <span className="font-medium text-[var(--afra-text-primary)]">
                        {formatRial(item.amount)} ریال
                      </span>
                    </div>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-[var(--afra-surface-secondary)]">
                    <div
                      className="h-full rounded-full bg-[var(--afra-primary)]"
                      style={{ width: `${width}%` }}
                    />
                  </div>

                  <div className="mt-1 flex justify-end text-[10px] text-[var(--afra-text-muted)]">
                    {item.completed.toLocaleString("fa-IR")} تکمیل‌شده
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Status */}
        <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
          <SectionHeader
            icon={Clock3}
            title="وضعیت درخواست‌ها"
            description="توزیع وضعیت فعلی درخواست‌ها"
          />

          <div className="mb-6 flex justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[20px] border-[var(--afra-primary-soft)]">
              <div className="text-center">
                <p className="text-3xl font-bold text-[var(--afra-text-primary)]">
                  {totalStatusCount.toLocaleString("fa-IR")}
                </p>

                <p className="text-[10px] text-[var(--afra-text-muted)]">
                  درخواست
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {statusDistribution.map((item) => {
              const percentage =
                (item.value / totalStatusCount) * 100;

              return (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="text-xs text-[var(--afra-text-secondary)]">
                      {item.label}
                    </span>

                    <span className="text-xs font-semibold text-[var(--afra-text-primary)]">
                      {item.value.toLocaleString("fa-IR")}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--afra-surface-secondary)]">
                    <div
                      className="h-full rounded-full bg-[var(--afra-primary)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Departments + Suppliers */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Departments */}
        <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
          <SectionHeader
            icon={Building2}
            title="گزارش واحدها"
            description="مقایسه عملکرد واحدهای سازمانی"
          />

          <div className="space-y-5">
            {departmentReport.map((department) => {
              const width =
                (department.amount / maxDepartmentAmount) * 100;

              return (
                <div key={department.department}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-[var(--afra-text-primary)]">
                      {department.department}
                    </span>

                    <span className="text-[11px] text-[var(--afra-text-muted)]">
                      {department.requests.toLocaleString("fa-IR")} درخواست
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--afra-surface-secondary)]">
                    <div
                      className="h-full rounded-full bg-[var(--afra-primary)]"
                      style={{ width: `${width}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--afra-text-muted)]">
                    <span>
                      {department.completed.toLocaleString("fa-IR")} تکمیل‌شده
                    </span>

                    <span>
                      {department.pending.toLocaleString("fa-IR")} در انتظار
                    </span>

                    <span className="font-medium text-[var(--afra-text-secondary)]">
                      {formatRial(department.amount)} ریال
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Suppliers */}
        <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
          <SectionHeader
            icon={Users}
            title="تأمین‌کنندگان"
            description="تأمین‌کنندگان با بیشترین حجم درخواست"
          />

          <div className="space-y-1">
            {topSuppliers.map((supplier, index) => (
              <div
                key={supplier.name}
                className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[var(--afra-surface-hover)]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--afra-surface-secondary)] text-xs font-bold text-[var(--afra-text-secondary)]">
                  {(index + 1).toLocaleString("fa-IR")}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[var(--afra-text-primary)]">
                    {supplier.name}
                  </p>

                  <p className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
                    {supplier.requests.toLocaleString("fa-IR")} درخواست
                  </p>
                </div>

                <span className="shrink-0 text-[11px] font-medium text-[var(--afra-text-secondary)]">
                  {formatRial(supplier.amount)} ریال
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent requests */}
      <section className="mt-5 overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
        <div className="flex items-center justify-between border-b border-[var(--afra-border)] px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
              آخرین درخواست‌ها
            </h2>

            <p className="mt-1 text-[11px] text-[var(--afra-text-muted)]">
              نمونه‌ای از درخواست‌های اخیر در گزارش
            </p>
          </div>

          <Link
            href="/requests"
            className="text-xs font-medium text-[var(--afra-primary)] hover:underline"
          >
            مشاهده همه
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[850px] text-right">
            <thead>
              <tr className="border-b border-[var(--afra-border)] bg-[var(--afra-surface-secondary)]">
                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  شناسه
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  پروژه
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  واحد
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  مبلغ
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  وضعیت
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  مشاهده
                </th>
              </tr>
            </thead>

            <tbody>
              {recentReportRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-[var(--afra-border)] last:border-b-0 hover:bg-[var(--afra-surface-hover)]"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/requests/${request.id}`}
                      className="text-xs font-semibold text-[var(--afra-primary)] hover:underline"
                    >
                      {request.id}
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs text-[var(--afra-text-primary)]">
                      {request.project}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs text-[var(--afra-text-secondary)]">
                      {request.department}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-[var(--afra-text-primary)]">
                      {formatRial(request.amount)} ریال
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge type={request.statusType}>
                      {request.status}
                    </StatusBadge>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/requests/${request.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[var(--afra-primary)] hover:underline"
                    >
                      مشاهده
                      <ChevronLeft size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-[var(--afra-border)] lg:hidden">
          {recentReportRequests.map((request) => (
            <Link
              key={request.id}
              href={`/requests/${request.id}`}
              className="block p-4 transition-colors hover:bg-[var(--afra-surface-hover)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[var(--afra-primary)]">
                    {request.id}
                  </p>

                  <p className="mt-1 text-sm font-medium text-[var(--afra-text-primary)]">
                    {request.project}
                  </p>

                  <p className="mt-1 text-[11px] text-[var(--afra-text-muted)]">
                    {request.department}
                  </p>
                </div>

                <StatusBadge type={request.statusType}>
                  {request.status}
                </StatusBadge>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[var(--afra-border)] pt-3">
                <span className="text-xs font-medium text-[var(--afra-text-primary)]">
                  {formatRial(request.amount)} ریال
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] text-[var(--afra-primary)]">
                  مشاهده
                  <ChevronLeft size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Info */}
      <div className="mt-4 rounded-[12px] border border-[var(--afra-border)] bg-[var(--afra-surface-secondary)] px-4 py-3">
        <div className="flex items-start gap-2.5">
          <BarChart3
            size={16}
            className="mt-0.5 shrink-0 text-[var(--afra-primary)]"
          />

          <p className="text-[11px] leading-6 text-[var(--afra-text-secondary)]">
            اطلاعات این صفحه در نسخه فعلی نمونه هستند. در نسخه نهایی،
            گزارش‌ها مستقیماً از داده‌های واقعی درخواست‌ها، پرداخت‌ها و
            گردش کار در پایگاه داده تولید خواهند شد.
          </p>
        </div>
      </div>
    </div>
  );
}