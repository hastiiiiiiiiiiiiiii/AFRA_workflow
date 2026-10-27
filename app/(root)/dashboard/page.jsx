"use client";

import { useEffect, useState } from "react";

import StatsCards from "@/components/dashboard/StatsCards";
import MyTasks from "@/components/dashboard/MyTasks";
import RequestOverview from "@/components/dashboard/RequestOverview";
import RecentRequests from "@/components/dashboard/RecentRequests";
import RecentActivity from "@/components/dashboard/RecentActivity";

import { getCurrentUser } from "@/lib/auth/session";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
    fetch("/api/dashboard", {cache:"no-store"}).then(r=>r.json()).then(j=>j.ok&&setData(j.data)).catch(()=>{});
  }, []);

  const roleTitles={ACCOUNTANT:["درخواست‌های من","درخواست‌هایی که ایجاد یا برای اصلاح به شما برگشت داده شده‌اند"],FIRST_REVIEWER:["وظایف بررسی اولیه","درخواست‌هایی که منتظر بررسی اولیه شما هستند"],PAYMENT_OFFICER:["وظایف پرداخت","درخواست‌هایی که نیازمند انجام پرداخت هستند"],PAYMENT_CONTROLLER:["کنترل پرداخت","پرداخت‌هایی که نیازمند کنترل شما هستند"],FINAL_AUTHORITY:["بررسی‌های نهایی","درخواست‌هایی که نیازمند بررسی و تأیید نهایی شما هستند"]};
  const [title, subtitle] = roleTitles[user?.roleKey] || roleTitles.ACCOUNTANT;
  const dashboardStats=data?.stats||{totalRequests:0,completed:0,inReview:0,returned:0};
  const roleTasks=data?.tasks||[];
  const requestOverview=[{label:"تکمیل‌شده",value:dashboardStats.completed,type:"success"},{label:"در حال بررسی",value:dashboardStats.inReview,type:"info"},{label:"برگشت‌خورده",value:dashboardStats.returned,type:"danger"}];
  const recentActivities=data?.activities||[];
  const recentRequests=(data?.recentRequests||[]).map(r=>({...r,status:r.statusLabel}));

  return (
    <div className="min-h-full p-4 sm:p-5 lg:p-7">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium text-[var(--afra-text-muted)]">
            داشبورد
          </p>

          <h1 className="text-xl font-bold tracking-tight text-[var(--afra-text-primary)] sm:text-2xl">
            خوش آمدید، {user?.name || "کاربر"}
          </h1>

          <p className="mt-1 text-xs text-[var(--afra-text-secondary)] sm:text-sm">
            {subtitle}
          </p>
        </div>

        <div className="text-xs text-[var(--afra-text-muted)]">
          {new Intl.DateTimeFormat("fa-IR", {dateStyle:"medium"}).format(new Date())}
        </div>
      </div>

      {/* Global Statistics */}
      <StatsCards stats={dashboardStats} />

      {/* Role Based Tasks */}
      <div className="mt-5">
        <MyTasks
          tasks={roleTasks}
          title={title}
          subtitle={subtitle}
        />
      </div>

      {/* Overview + Activity */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <RequestOverview data={requestOverview} />

        <RecentActivity activities={recentActivities} />
      </div>

      {/* Recent Requests */}
      <div className="mt-5">
        <RecentRequests requests={recentRequests} />
      </div>
    </div>
  );
}