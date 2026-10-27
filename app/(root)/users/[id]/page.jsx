"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";


const userRoles=[{key:"ACCOUNTANT",label:"کارشناس مالی"},{key:"FIRST_REVIEWER",label:"مدیر بازرگانی"},{key:"PAYMENT_OFFICER",label:"مدیر مالی"},{key:"PAYMENT_CONTROLLER",label:"کنترل پرداخت"},{key:"FINAL_AUTHORITY",label:"مدیر عامل"}];

const statusStyles = {
  success:
    "bg-[var(--afra-success-soft)] text-[var(--afra-success)]",
  danger:
    "bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]",
};

function UserAvatar({ name, large = false }) {
  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center rounded-full",
        "bg-[var(--afra-primary-soft)] font-bold text-[var(--afra-primary)]",
        large ? "h-20 w-20 text-2xl" : "h-10 w-10 text-xs",
      ].join(" ")}
    >
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

function InfoItem({ label, value, direction }) {
  return (
    <div className="rounded-[10px] bg-[var(--afra-surface-secondary)] p-3">
      <div className="text-[9px] text-[var(--afra-text-muted)]">
        {label}
      </div>

      <div
        dir={direction}
        className="mt-1.5 text-[11px] font-medium"
      >
        {value || "—"}
      </div>
    </div>
  );
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [active, setActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  useEffect(()=>{fetch(`/api/users/${params.id}`,{cache:"no-store"}).then(r=>r.json()).then(j=>{if(j.ok){setUser(j.data);setActive(j.data.status==="فعال")}else setError(j.error||"کاربر پیدا نشد")}).catch(()=>setError("خطا در دریافت کاربر"))},[params.id]);

  if (!user && !error) return <div className="p-8 text-sm">در حال بارگذاری...</div>;

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[1440px] items-center justify-center p-6">
        <div className="text-center">
          <div className="text-2xl font-bold">
            کاربر پیدا نشد
          </div>

          <p className="mt-2 text-xs text-[var(--afra-text-muted)]">
            کاربر موردنظر وجود ندارد یا شناسه آن صحیح نیست.
          </p>

          <Link
            href="/users"
            className="mt-5 inline-flex rounded-[9px] bg-[var(--afra-primary)] px-4 py-2.5 text-xs font-bold text-white"
          >
            بازگشت به کاربران
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setError("");
    const form=document.querySelector("[data-user-edit]");
    const data={name:form?.querySelector("[name=name]")?.value,username:form?.querySelector("[name=username]")?.value,mobile:form?.querySelector("[name=mobile]")?.value,jobTitle:user.jobTitle,roleKey:form?.querySelector("[name=roleKey]")?.value,active};
    const password=form?.querySelector("[name=password]")?.value; if(password)data.password=password;
    const r=await fetch(`/api/users/${params.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const j=await r.json();if(!r.ok||!j.ok){setError(j.error||"ذخیره ناموفق بود");return;}setUser(j.data);setEditing(false);setSaved(true);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-[10px] text-[var(--afra-text-muted)]">
        <Link
          href="/users"
          className="hover:text-[var(--afra-primary)]"
        >
          کاربران
        </Link>

        <span>‹</span>

        <span className="text-[var(--afra-text-secondary)]">
          {user.name}
        </span>
      </div>

      {/* Header */}
      <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)] sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar name={user.name} large />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold">
                  {user.name}
                </h1>

                <StatusBadge
                  status={active ? "فعال" : "غیرفعال"}
                  type={active ? "success" : "danger"}
                />
              </div>

              <p className="mt-1 text-xs text-[var(--afra-text-secondary)]">
                {user.role}
              </p>

              <p className="mt-2 text-[9px] text-[var(--afra-text-muted)]">
                شناسه کاربر: {user.id}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              className="
                h-10 rounded-[9px]
                border border-[var(--afra-border)]
                px-4
                text-[10px] font-bold
                hover:bg-[var(--afra-surface-secondary)]
              "
            >
              {editing ? "لغو ویرایش" : "ویرایش اطلاعات"}
            </button>

            <button
              type="button"
              onClick={() => setActive((value) => !value)}
              className={[
                "h-10 rounded-[9px] px-4 text-[10px] font-bold",
                active
                  ? "border border-[var(--afra-danger)] text-[var(--afra-danger)] hover:bg-[var(--afra-danger-soft)]"
                  : "bg-[var(--afra-primary)] text-white hover:bg-[var(--afra-primary-hover)]",
              ].join(" ")}
            >
              {active ? "غیرفعال کردن کاربر" : "فعال کردن کاربر"}
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        {/* Main */}
        <div className="space-y-5">
          {/* Basic Info */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
            <div className="mb-5">
              <h2 className="text-sm font-bold">
                اطلاعات کاربر
              </h2>

              <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                اطلاعات پایه حساب کاربری
              </p>
            </div>

            {editing ? (
              <div data-user-edit className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold">
                    نام و نام خانوادگی
                  </label>

                  <input
                    defaultValue={user.name}
                    name="name"
                    className="h-10 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold">
                    نام کاربری
                  </label>

                  <input
                    defaultValue={user.username}
                    name="username"
                    className="h-10 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold">
                    شماره موبایل
                  </label>

                  <input
                    defaultValue={user.mobile}
                    name="mobile"
                    dir="ltr"
                    className="h-10 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-left text-[11px] outline-none focus:border-[var(--afra-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold">
                    نقش کاربر
                  </label>

                  <select
                    defaultValue={user.roleKey}
                    name="roleKey"
                    className="h-10 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                  >
                    {userRoles
                      .filter((item) => item.key !== "ALL")
                      .map((item) => (
                        <option key={item.key} value={item.key}>
                          {item.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="h-10 rounded-[9px] bg-[var(--afra-primary)] px-5 text-[10px] font-bold text-white hover:bg-[var(--afra-primary-hover)]"
                  >
                    ذخیره تغییرات
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                <InfoItem
                  label="نام و نام خانوادگی"
                  value={user.name}
                />

                <InfoItem
                  label="نام کاربری"
                  value={user.username}
                />

                <InfoItem
                  label="شماره موبایل"
                  value={user.mobile}
                  direction="ltr"
                />

                <InfoItem
                  label="نقش"
                  value={user.role}
                />

                <InfoItem
                  label="شناسه کاربر"
                  value={user.id}
                />

                <InfoItem
                  label="آخرین فعالیت"
                  value={user.lastActivity}
                />
              </div>
            )}
          </section>

          {/* Security */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
            <div className="mb-5">
              <h2 className="text-sm font-bold">
                امنیت حساب
              </h2>

              <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                تنظیمات مرتبط با ورود و دسترسی حساب
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-3 rounded-[10px] bg-[var(--afra-surface-secondary)] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-bold">
                    رمز عبور
                  </div>

                  <div className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                    رمز عبور حساب کاربر
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  className="rounded-[8px] border border-[var(--afra-border)] px-3 py-2 text-[9px] font-bold"
                >
                  {showPassword
                    ? "پنهان کردن"
                    : "تغییر رمز عبور"}
                </button>
              </div>

              {showPassword && (
                <div className="rounded-[10px] border border-[var(--afra-border)] p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold">
                        رمز عبور جدید
                      </label>

                      <input
                        type="password"
                        name="password"
                        placeholder="رمز عبور جدید"
                        className="h-10 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold">
                        تکرار رمز عبور
                      </label>

                      <input
                        type="password"
                        placeholder="تکرار رمز عبور"
                        className="h-10 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-3 h-9 rounded-[9px] bg-[var(--afra-primary)] px-4 text-[10px] font-bold text-white"
                  >
                    تغییر رمز عبور
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3 rounded-[10px] bg-[var(--afra-surface-secondary)] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-bold">
                    وضعیت حساب
                  </div>

                  <div className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                    کاربر {active ? "امکان ورود" : "امکان ورود ندارد"}.
                  </div>
                </div>

                <StatusBadge
                  status={active ? "فعال" : "غیرفعال"}
                  type={active ? "success" : "danger"}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Role */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
            <div className="mb-4">
              <h2 className="text-sm font-bold">
                نقش و دسترسی
              </h2>

              <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                سطح دسترسی تعریف‌شده برای این کاربر
              </p>
            </div>

            <div className="rounded-[10px] bg-[var(--afra-primary-soft)] p-4">
              <div className="text-[9px] text-[var(--afra-text-secondary)]">
                نقش فعلی
              </div>

              <div className="mt-2 text-sm font-bold text-[var(--afra-primary)]">
                {user.role}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <PermissionItem
                label="مشاهده درخواست‌ها"
                enabled
              />

              <PermissionItem
                label="مشاهده وظایف"
                enabled
              />

              <PermissionItem
                label="مشاهده گزارش‌ها"
                enabled
              />

              <PermissionItem
                label="تغییر اطلاعات کاربران"
                enabled={user.roleKey === "FINAL_AUTHORITY"}
              />
            </div>
          </section>

          {/* Activity */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
            <div className="mb-4">
              <h2 className="text-sm font-bold">
                فعالیت اخیر
              </h2>

              <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                آخرین فعالیت ثبت‌شده کاربر
              </p>
            </div>

            <div className="relative pr-5">
              <div className="absolute right-[4px] top-1 bottom-1 w-px bg-[var(--afra-border)]" />

              <div className="relative">
                <span className="absolute -right-[1px] top-1 h-2.5 w-2.5 rounded-full bg-[var(--afra-success)] ring-4 ring-[var(--afra-success-soft)]" />

                <div className="text-[10px] font-bold">
                  ورود به سامانه
                </div>

                <div className="mt-1 text-[9px] text-[var(--afra-text-muted)]">
                  {user.lastActivity}
                </div>
              </div>

              <div className="relative mt-6">
                <span className="absolute -right-[1px] top-1 h-2.5 w-2.5 rounded-full bg-[var(--afra-info)] ring-4 ring-[var(--afra-info-soft)]" />

                <div className="text-[10px] font-bold">
                  مشاهده درخواست
                </div>

                <div className="mt-1 text-[9px] text-[var(--afra-text-muted)]">
                  امروز، ۰۹:۴۵
                </div>
              </div>
            </div>

            <Link
              href="/activity"
              className="mt-5 flex h-9 items-center justify-center rounded-[9px] border border-[var(--afra-border)] text-[9px] font-bold hover:bg-[var(--afra-surface-secondary)]"
            >
              مشاهده تمام فعالیت‌ها
            </Link>
          </section>
        </aside>
      </div>

      {/* Save Notification */}
      {saved && (
        <div className="fixed bottom-5 left-5 z-[60] rounded-[10px] bg-[var(--afra-success)] px-4 py-3 text-[10px] font-bold text-white shadow-[var(--afra-shadow-md)]">
          ✓ تغییرات با موفقیت ذخیره شد.
        </div>
      )}
    </div>
  );
}

function PermissionItem({ label, enabled }) {
  return (
    <div className="flex items-center justify-between rounded-[9px] border border-[var(--afra-border)] px-3 py-2.5">
      <span className="text-[10px]">
        {label}
      </span>

      <span
        className={[
          "text-[10px] font-bold",
          enabled
            ? "text-[var(--afra-success)]"
            : "text-[var(--afra-text-muted)]",
        ].join(" ")}
      >
        {enabled ? "فعال" : "غیرفعال"}
      </span>
    </div>
  );
}