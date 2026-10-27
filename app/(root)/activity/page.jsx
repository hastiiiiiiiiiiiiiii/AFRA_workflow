"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  RotateCcw,
  CreditCard,
  Activity as ActivityIcon,
  LogIn,
  FileText,
  UserRound,
  ChevronLeft,
  X,
} from "lucide-react";

import {
  activityTypes,
} from "@/lib/mock/activity";

const typeConfig = {
  REQUEST: {
    label: "درخواست",
    icon: FileText,
    className:
      "bg-[var(--afra-info-soft)] text-[var(--afra-info)]",
  },
  APPROVAL: {
    label: "تأیید",
    icon: CheckCircle2,
    className:
      "bg-[var(--afra-success-soft)] text-[var(--afra-success)]",
  },
  REJECTION: {
    label: "برگشت / رد",
    icon: RotateCcw,
    className:
      "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]",
  },
  PAYMENT: {
    label: "پرداخت",
    icon: CreditCard,
    className:
      "bg-[var(--afra-warning-soft)] text-[var(--afra-warning)]",
  },
  AUTH: {
    label: "ورود / خروج",
    icon: LogIn,
    className:
      "bg-[var(--afra-surface-secondary)] text-[var(--afra-text-secondary)]",
  },
  USER: {
    label: "کاربر",
    icon: UserRound,
    className:
      "bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]",
  },
};

function ActivityBadge({ type }) {
  const config = typeConfig[type] || typeConfig.REQUEST;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${config.className}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
}

function SummaryCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-[var(--afra-text-muted)]">{title}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--afra-text-primary)]">
            {value.toLocaleString("fa-IR")}
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

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [activityUsers, setActivityUsers] = useState([{key:"ALL",label:"همه کاربران"}]);
  const activitySummary = {total:activities.length, approvals:activities.filter(a=>a.type==="APPROVAL").length, payments:activities.filter(a=>a.type==="PAYMENT").length, rejections:activities.filter(a=>a.type==="REJECTION").length};
  useEffect(()=>{fetch("/api/activity",{cache:"no-store"}).then(r=>r.json()).then(j=>{if(j.ok){setActivities(j.data);setActivityUsers([{key:"ALL",label:"همه کاربران"},...Array.from(new Map(j.data.map(a=>[a.userId,{key:a.userId,label:a.user}])).values())]);}}).catch(()=>{});},[]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [userFilter, setUserFilter] = useState("ALL");

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesSearch =
        !query ||
        activity.action.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.user.toLowerCase().includes(query) ||
        activity.role.toLowerCase().includes(query) ||
        activity.id.toLowerCase().includes(query) ||
        (activity.requestId &&
          activity.requestId.toLowerCase().includes(query));

      const matchesType =
        typeFilter === "ALL" || activity.type === typeFilter;

      const matchesUser =
        userFilter === "ALL" || activity.userId === userFilter;

      return matchesSearch && matchesType && matchesUser;
    });
  }, [search, typeFilter, userFilter]);

  const hasFilters =
    search.trim() || typeFilter !== "ALL" || userFilter !== "ALL";

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("ALL");
    setUserFilter("ALL");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[var(--afra-text-muted)]">
            <Link
              href="/"
              className="transition-colors hover:text-[var(--afra-primary)]"
            >
              داشبورد
            </Link>

            <ChevronLeft size={13} />

            <span>فعالیت‌ها</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--afra-text-primary)]">
            فعالیت‌های سیستم
          </h1>

          <p className="mt-1 text-sm text-[var(--afra-text-secondary)]">
            تاریخچه فعالیت‌ها و رویدادهای ثبت‌شده در سامانه
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-[10px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 py-2 text-xs text-[var(--afra-text-secondary)]">
          <ActivityIcon size={15} />
          ثبت خودکار فعالیت‌ها
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard
          icon={ActivityIcon}
          title="کل فعالیت‌ها"
          value={activitySummary.total}
          description="رویداد ثبت‌شده"
        />

        <SummaryCard
          icon={CheckCircle2}
          title="تأییدها"
          value={activitySummary.approvals}
          description="عملیات تأیید"
        />

        <SummaryCard
          icon={RotateCcw}
          title="برگشت / رد"
          value={activitySummary.returns}
          description="درخواست برگشت‌خورده"
        />

        <SummaryCard
          icon={CreditCard}
          title="فعالیت پرداخت"
          value={activitySummary.payments}
          description="رویداد مالی"
        />
      </div>

      {/* Filters */}
      <div className="mb-5 rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter
              size={17}
              className="text-[var(--afra-primary)]"
            />

            <span className="text-sm font-semibold text-[var(--afra-text-primary)]">
              فیلتر فعالیت‌ها
            </span>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--afra-danger)] transition-colors hover:opacity-80"
            >
              <X size={14} />
              حذف فیلترها
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--afra-text-muted)]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجو در فعالیت‌ها..."
              className="h-11 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-background)] pr-10 pl-3 text-sm text-[var(--afra-text-primary)] outline-none transition-colors placeholder:text-[var(--afra-text-muted)] focus:border-[var(--afra-primary)]"
            />
          </div>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="h-11 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-background)] px-3 text-sm text-[var(--afra-text-primary)] outline-none focus:border-[var(--afra-primary)]"
          >
            {activityTypes.map((type) => (
              <option key={type.key} value={type.key}>
                {type.label}
              </option>
            ))}
          </select>

          {/* User */}
          <select
            value={userFilter}
            onChange={(event) => setUserFilter(event.target.value)}
            className="h-11 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-background)] px-3 text-sm text-[var(--afra-text-primary)] outline-none focus:border-[var(--afra-primary)]"
          >
            {activityUsers.map((user) => (
              <option key={user.key} value={user.key}>
                {user.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
        <div className="flex items-center justify-between border-b border-[var(--afra-border)] px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
              تاریخچه فعالیت‌ها
            </h2>

            <p className="mt-1 text-[11px] text-[var(--afra-text-muted)]">
              {filteredActivities.length.toLocaleString("fa-IR")} فعالیت
              نمایش داده می‌شود
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[950px] text-right">
            <thead>
              <tr className="border-b border-[var(--afra-border)] bg-[var(--afra-surface-secondary)]">
                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  زمان
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  کاربر
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  نوع
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  عملیات
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  درخواست
                </th>

                <th className="px-5 py-3 text-xs font-medium text-[var(--afra-text-secondary)]">
                  توضیحات
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-[var(--afra-border)] last:border-b-0 hover:bg-[var(--afra-surface-hover)]"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="text-xs text-[var(--afra-text-primary)]">
                      {activity.timestamp.split(" — ")[0]}
                    </div>

                    <div className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
                      {activity.timestamp.split(" — ")[1]}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--afra-primary-soft)] text-xs font-bold text-[var(--afra-primary)]">
                        {activity.user.charAt(0)}
                      </div>

                      <div>
                        <p className="whitespace-nowrap text-xs font-medium text-[var(--afra-text-primary)]">
                          {activity.user}
                        </p>

                        <p className="mt-0.5 whitespace-nowrap text-[10px] text-[var(--afra-text-muted)]">
                          {activity.role}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <ActivityBadge type={activity.type} />
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-[var(--afra-text-primary)]">
                      {activity.action}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {activity.requestId ? (
                      <Link
                        href={`/requests/${activity.requestId}`}
                        className="text-xs font-semibold text-[var(--afra-primary)] hover:underline"
                      >
                        {activity.requestId}
                      </Link>
                    ) : (
                      <span className="text-xs text-[var(--afra-text-muted)]">
                        —
                      </span>
                    )}
                  </td>

                  <td className="max-w-[320px] px-5 py-4">
                    <p className="truncate text-xs text-[var(--afra-text-secondary)]">
                      {activity.description}
                    </p>
                  </td>
                </tr>
              ))}

              {filteredActivities.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <ActivityIcon
                      size={30}
                      className="mx-auto text-[var(--afra-text-muted)]"
                    />

                    <p className="mt-3 text-sm font-medium text-[var(--afra-text-primary)]">
                      فعالیتی پیدا نشد
                    </p>

                    <p className="mt-1 text-xs text-[var(--afra-text-muted)]">
                      فیلترها یا عبارت جستجو را تغییر دهید.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet */}
        <div className="divide-y divide-[var(--afra-border)] lg:hidden">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--afra-primary-soft)] text-xs font-bold text-[var(--afra-primary)]">
                  {activity.user.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-[var(--afra-text-primary)]">
                        {activity.user}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
                        {activity.role}
                      </p>
                    </div>

                    <ActivityBadge type={activity.type} />
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-[var(--afra-text-primary)]">
                      {activity.action}
                    </p>

                    <p className="mt-1 text-xs leading-6 text-[var(--afra-text-secondary)]">
                      {activity.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--afra-border)] pt-3">
                    <div className="text-[10px] text-[var(--afra-text-muted)]">
                      {activity.timestamp}
                    </div>

                    {activity.requestId && (
                      <Link
                        href={`/requests/${activity.requestId}`}
                        className="text-[11px] font-semibold text-[var(--afra-primary)]"
                      >
                        {activity.requestId}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <div className="px-5 py-16 text-center">
              <ActivityIcon
                size={30}
                className="mx-auto text-[var(--afra-text-muted)]"
              />

              <p className="mt-3 text-sm font-medium text-[var(--afra-text-primary)]">
                فعالیتی پیدا نشد
              </p>

              <p className="mt-1 text-xs text-[var(--afra-text-muted)]">
                فیلترها یا عبارت جستجو را تغییر دهید.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* System note */}
      <div className="mt-4 rounded-[12px] border border-[var(--afra-border)] bg-[var(--afra-surface-secondary)] px-4 py-3">
        <div className="flex items-start gap-2.5">
          <ActivityIcon
            size={16}
            className="mt-0.5 shrink-0 text-[var(--afra-primary)]"
          />

          <p className="text-[11px] leading-6 text-[var(--afra-text-secondary)]">
            فعالیت‌های این بخش در نسخه نهایی به‌صورت خودکار توسط سیستم ثبت
            می‌شوند و کاربران عادی امکان حذف یا تغییر سوابق را نخواهند داشت.
          </p>
        </div>
      </div>
    </div>
  );
}