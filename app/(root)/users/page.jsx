"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";


const statusStyles = {
  success:
    "bg-[var(--afra-success-soft)] text-[var(--afra-success)]",

  danger:
    "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]",
};

function UserAvatar({ name }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--afra-primary-soft)] text-xs font-bold text-[var(--afra-primary)]">
      {name?.charAt(0) || "ک"}
    </div>
  );
}

function StatusBadge({ status, type }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-medium",
        statusStyles[type] || statusStyles.success,
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  useEffect(() => { fetch("/api/users", {cache:"no-store"}).then(r=>r.json()).then(j=>{if(j.ok){setUsers(j.data);setUserRoles([...new Map(j.data.map(u=>[u.roleKey,{key:u.roleKey,label:u.role}])).values()]);}}).catch(()=>{}); }, []);
  const [role, setRole] = useState("ALL");

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.username.toLowerCase().includes(searchValue) ||
        user.mobile.includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue);

      const matchesRole =
        role === "ALL" || user.roleKey === role;

      return matchesSearch && matchesRole;
    });
  }, [search, role]);

  const activeUsers = users.filter(
    (user) => user.status === "فعال"
  ).length;

  return (
    <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium text-[var(--afra-primary)]">
            مدیریت سیستم
          </p>

          <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
            کاربران
          </h1>

          <p className="mt-1 text-xs text-[var(--afra-text-secondary)]">
            مدیریت کاربران و نقش‌های دسترسی سامانه
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex h-10 items-center justify-center gap-2
            rounded-[9px]
            bg-[var(--afra-primary)]
            px-4
            text-xs font-bold text-white
            hover:bg-[var(--afra-primary-hover)]
          "
        >
          <span className="text-base leading-none">+</span>
          افزودن کاربر
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
          <p className="text-[10px] text-[var(--afra-text-muted)]">
            کل کاربران
          </p>

          <p className="mt-2 text-xl font-bold">
            {users.length}
          </p>
        </div>

        <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
          <p className="text-[10px] text-[var(--afra-text-muted)]">
            کاربران فعال
          </p>

          <p className="mt-2 text-xl font-bold text-[var(--afra-success)]">
            {activeUsers}
          </p>
        </div>

        <div className="col-span-2 rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)] md:col-span-1">
          <p className="text-[10px] text-[var(--afra-text-muted)]">
            نقش‌های تعریف‌شده
          </p>

          <p className="mt-2 text-xl font-bold">
            {userRoles.length - 1}
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="mb-5 rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
        <div className="grid gap-3 md:grid-cols-[1fr_260px]">
          <div>
            <label
              htmlFor="user-search"
              className="mb-1.5 block text-[10px] font-bold"
            >
              جستجو
            </label>

            <input
              id="user-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="نام، نام کاربری، شماره موبایل یا نقش..."
              className="
                h-10 w-full rounded-[9px]
                border border-[var(--afra-border)]
                bg-[var(--afra-surface)]
                px-3
                text-[11px]
                outline-none
                placeholder:text-[var(--afra-text-muted)]
                focus:border-[var(--afra-primary)]
              "
            />
          </div>

          <div>
            <label
              htmlFor="role-filter"
              className="mb-1.5 block text-[10px] font-bold"
            >
              نقش
            </label>

            <select
              id="role-filter"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="
                h-10 w-full rounded-[9px]
                border border-[var(--afra-border)]
                bg-[var(--afra-surface)]
                px-3
                text-[11px]
                outline-none
                focus:border-[var(--afra-primary)]
              "
            >
              {userRoles.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* User List */}
      <section className="overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
        <div className="flex items-center justify-between border-b border-[var(--afra-border)] px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-sm font-bold">
              فهرست کاربران
            </h2>

            <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
              {filteredUsers.length} کاربر نمایش داده می‌شود
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--afra-border)] bg-[var(--afra-surface-secondary)]">
                <th className="px-5 py-3 text-right text-[10px] font-bold text-[var(--afra-text-secondary)]">
                  کاربر
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-bold text-[var(--afra-text-secondary)]">
                  نام کاربری
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-bold text-[var(--afra-text-secondary)]">
                  شماره موبایل
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-bold text-[var(--afra-text-secondary)]">
                  نقش
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-bold text-[var(--afra-text-secondary)]">
                  وضعیت
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-bold text-[var(--afra-text-secondary)]">
                  آخرین فعالیت
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-bold text-[var(--afra-text-secondary)]">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[var(--afra-border)] last:border-b-0 hover:bg-[var(--afra-surface-hover)]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} />

                      <div>
                        <div className="text-xs font-bold">
                          {user.name}
                        </div>

                        <div className="mt-0.5 text-[9px] text-[var(--afra-text-muted)]">
                          شناسه: {user.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-[10px] font-medium">
                    {user.username}
                  </td>

                  <td
                    dir="ltr"
                    className="px-4 py-4 text-right text-[10px] text-[var(--afra-text-secondary)]"
                  >
                    {user.mobile}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-[var(--afra-primary-soft)] px-2.5 py-1 text-[9px] font-medium text-[var(--afra-primary)]">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge
                      status={user.status}
                      type={user.statusType}
                    />
                  </td>

                  <td className="px-4 py-4 text-[10px] text-[var(--afra-text-muted)]">
                    {user.lastActivity}
                  </td>

                  <td className="px-5 py-4 text-left">
                    <Link
                      href={`/users/${user.id}`}
                      className="
                        inline-flex rounded-[8px]
                        border border-[var(--afra-border)]
                        px-3 py-1.5
                        text-[9px] font-bold
                        hover:bg-[var(--afra-surface-secondary)]
                      "
                    >
                      مشاهده
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-14 text-center">
                    <div className="text-sm font-bold">
                      کاربری پیدا نشد
                    </div>

                    <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                      عبارت جستجو یا فیلتر نقش را تغییر دهید.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-[var(--afra-border)] md:hidden">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4">
              <div className="flex items-start gap-3">
                <UserAvatar name={user.name} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xs font-bold">
                      {user.name}
                    </h3>

                    <StatusBadge
                      status={user.status}
                      type={user.statusType}
                    />
                  </div>

                  <p className="mt-1 text-[9px] text-[var(--afra-text-muted)]">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-[9px] bg-[var(--afra-surface-secondary)] p-2.5">
                  <div className="text-[8px] text-[var(--afra-text-muted)]">
                    نام کاربری
                  </div>

                  <div className="mt-1 text-[10px] font-medium">
                    {user.username}
                  </div>
                </div>

                <div className="rounded-[9px] bg-[var(--afra-surface-secondary)] p-2.5">
                  <div className="text-[8px] text-[var(--afra-text-muted)]">
                    موبایل
                  </div>

                  <div
                    dir="ltr"
                    className="mt-1 text-right text-[10px] font-medium"
                  >
                    {user.mobile}
                  </div>
                </div>

                <div className="col-span-2 rounded-[9px] bg-[var(--afra-surface-secondary)] p-2.5">
                  <div className="text-[8px] text-[var(--afra-text-muted)]">
                    آخرین فعالیت
                  </div>

                  <div className="mt-1 text-[10px] font-medium">
                    {user.lastActivity}
                  </div>
                </div>
              </div>

              <Link
                href={`/users/${user.id}`}
                className="
                  mt-3 flex h-9 w-full
                  items-center justify-center
                  rounded-[9px]
                  border border-[var(--afra-border)]
                  text-[10px] font-bold
                  hover:bg-[var(--afra-surface-secondary)]
                "
              >
                مشاهده اطلاعات کاربر
              </Link>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="text-sm font-bold">
                کاربری پیدا نشد
              </div>

              <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                عبارت جستجو یا فیلتر نقش را تغییر دهید.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}