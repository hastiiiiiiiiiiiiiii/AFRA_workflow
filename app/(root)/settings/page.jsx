"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserRound,
  Bell,
  ShieldCheck,
  Palette,
  Moon,
  Sun,
  Monitor,
  Check,
  LockKeyhole,
  Smartphone,
  Info,
  ChevronLeft,
  Save,
} from "lucide-react";

const defaultSettings={theme:"light",notifications:{taskAssigned:true,requestUpdates:true,paymentUpdates:true,systemActivities:false}};
const systemInfo={name:"سامانه داخلی افرا",version:"1.0.0",environment:"Backend Connected",organization:"هلدینگ افرا"};
import { getCurrentUser } from "@/lib/auth/session";

const STORAGE_KEY = "afra-settings";

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  const [theme, setTheme] = useState(defaultSettings.theme);

  const [notifications, setNotifications] = useState(
    defaultSettings.notifications
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    fetch("/api/settings",{cache:"no-store"}).then(r=>r.json()).then(j=>{if(j.ok&&j.data){setTheme(j.data.theme||"light");setNotifications({taskAssigned:j.data.taskAssigned,requestUpdates:j.data.requestUpdates,paymentUpdates:j.data.paymentUpdates,systemActivities:j.data.systemActivities});}}).catch(()=>{});

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (parsed.theme) {
          setTheme(parsed.theme);
        }

        if (parsed.notifications) {
          setNotifications({
            ...defaultSettings.notifications,
            ...parsed.notifications,
          });
        }
      }
    } catch {
      // Ignore invalid local settings.
    }
  }, []);

  const handleThemeChange = (value) => {
    setTheme(value);

    if (value === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    const settings = {
      theme,
      notifications,
    };

    fetch("/api/settings",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(settings)}).catch(()=>{});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-xs text-[var(--afra-text-muted)]">
          <Link
            href="/"
            className="transition-colors hover:text-[var(--afra-primary)]"
          >
            داشبورد
          </Link>

          <ChevronLeft size={13} />

          <span>تنظیمات</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[var(--afra-text-primary)]">
          تنظیمات
        </h1>

        <p className="mt-1 text-sm text-[var(--afra-text-secondary)]">
          مدیریت اطلاعات حساب و تنظیمات سامانه
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-5">
          {/* Profile */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
            <div className="border-b border-[var(--afra-border)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
                  <UserRound size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
                    اطلاعات حساب
                  </h2>

                  <p className="mt-0.5 text-[11px] text-[var(--afra-text-muted)]">
                    اطلاعات کاربر فعلی سامانه
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <InfoField
                label="نام و نام خانوادگی"
                value={user?.name || "—"}
              />

              <InfoField
                label="نقش سازمانی"
                value={user?.role || "—"}
              />

              <InfoField
                label="نام کاربری"
                value={user?.username || "—"}
              />

              <InfoField
                label="شماره موبایل"
                value={user?.mobile || "—"}
              />
            </div>
          </section>

          {/* Appearance */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
            <div className="border-b border-[var(--afra-border)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
                  <Palette size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
                    ظاهر سامانه
                  </h2>

                  <p className="mt-0.5 text-[11px] text-[var(--afra-text-muted)]">
                    انتخاب حالت نمایش سامانه
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3">
              <ThemeOption
                active={theme === "light"}
                icon={Sun}
                title="حالت روشن"
                description="پس‌زمینه روشن"
                onClick={() => handleThemeChange("light")}
              />

              <ThemeOption
                active={theme === "dark"}
                icon={Moon}
                title="حالت تاریک"
                description="پس‌زمینه تیره"
                onClick={() => handleThemeChange("dark")}
              />

              <ThemeOption
                active={theme === "system"}
                icon={Monitor}
                title="حالت سیستم"
                description="هماهنگ با دستگاه"
                onClick={() => {
                  setTheme("system");

                  const prefersDark = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                  ).matches;

                  if (prefersDark) {
                    document.documentElement.setAttribute(
                      "data-theme",
                      "dark"
                    );
                  } else {
                    document.documentElement.removeAttribute(
                      "data-theme"
                    );
                  }
                }}
              />
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
            <div className="border-b border-[var(--afra-border)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
                  <Bell size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
                    اعلان‌ها
                  </h2>

                  <p className="mt-0.5 text-[11px] text-[var(--afra-text-muted)]">
                    مشخص کنید چه اعلان‌هایی برای شما فعال باشند
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[var(--afra-border)]">
              <NotificationRow
                title="وظیفه جدید"
                description="هنگامی که یک درخواست برای بررسی شما ارسال شود."
                checked={notifications.taskAssigned}
                onChange={() =>
                  toggleNotification("taskAssigned")
                }
              />

              <NotificationRow
                title="به‌روزرسانی درخواست"
                description="هنگامی که وضعیت یکی از درخواست‌های مرتبط تغییر کند."
                checked={notifications.requestUpdates}
                onChange={() =>
                  toggleNotification("requestUpdates")
                }
              />

              <NotificationRow
                title="وضعیت پرداخت"
                description="اعلان مربوط به ثبت یا تأیید پرداخت."
                checked={notifications.paymentUpdates}
                onChange={() =>
                  toggleNotification("paymentUpdates")
                }
              />

              <NotificationRow
                title="فعالیت‌های سیستم"
                description="اعلان رویدادهای عمومی سیستم."
                checked={notifications.systemActivities}
                onChange={() =>
                  toggleNotification("systemActivities")
                }
              />
            </div>
          </section>

          {/* Security */}
          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
            <div className="border-b border-[var(--afra-border)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
                    امنیت حساب
                  </h2>

                  <p className="mt-0.5 text-[11px] text-[var(--afra-text-muted)]">
                    تنظیمات امنیتی حساب کاربری
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[var(--afra-border)]">
              <SecurityRow
                icon={LockKeyhole}
                title="رمز عبور"
                description="رمز عبور حساب خود را مدیریت کنید."
                action="تغییر رمز عبور"
              />

              <SecurityRow
                icon={Smartphone}
                title="شماره موبایل"
                description={
                  user?.mobile
                    ? `شماره ثبت‌شده: ${user.mobile}`
                    : "شماره موبایل ثبت نشده است."
                }
                action="مدیریت"
              />
            </div>
          </section>

          {/* Save */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {saved && (
                <>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--afra-success-soft)] text-[var(--afra-success)]">
                    <Check size={13} />
                  </div>

                  <span className="text-xs text-[var(--afra-success)]">
                    تنظیمات با موفقیت ذخیره شد.
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={saveSettings}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[var(--afra-primary)] px-5 text-xs font-medium text-white transition-colors hover:bg-[var(--afra-primary-hover)]"
            >
              <Save size={15} />
              ذخیره تنظیمات
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Account status */}
          <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--afra-primary-soft)] font-bold text-[var(--afra-primary)]">
                {user?.name?.charAt(0) || "ا"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--afra-text-primary)]">
                  {user?.name || "کاربر سامانه"}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-[var(--afra-text-muted)]">
                  {user?.role || "—"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-[9px] bg-[var(--afra-success-soft)] px-3 py-2.5">
              <div className="h-2 w-2 rounded-full bg-[var(--afra-success)]" />

              <span className="text-[11px] font-medium text-[var(--afra-success)]">
                حساب فعال است
              </span>
            </div>
          </div>

          {/* System info */}
          <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5 shadow-[var(--afra-shadow-sm)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]">
                <Info size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[var(--afra-text-primary)]">
                  اطلاعات سامانه
                </h2>

                <p className="mt-0.5 text-[11px] text-[var(--afra-text-muted)]">
                  مشخصات نسخه فعلی
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <SystemInfoRow
                label="نام سامانه"
                value={systemInfo.name}
              />

              <SystemInfoRow
                label="سازمان"
                value={systemInfo.organization}
              />

              <SystemInfoRow
                label="نسخه"
                value={systemInfo.version}
              />

              <SystemInfoRow
                label="محیط"
                value={systemInfo.environment}
              />
            </div>
          </div>

          {/* Backend note */}
          <div className="rounded-[12px] border border-[var(--afra-border)] bg-[var(--afra-surface-secondary)] p-4">
            <div className="flex items-start gap-2.5">
              <Info
                size={16}
                className="mt-0.5 shrink-0 text-[var(--afra-primary)]"
              />

              <p className="text-[11px] leading-6 text-[var(--afra-text-secondary)]">
                تنظیمات این نسخه در مرورگر ذخیره می‌شوند. در نسخه نهایی،
                تنظیمات حساب و اعلان‌ها به حساب کاربری و Backend متصل
                خواهند شد.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] text-[var(--afra-text-muted)]">
        {label}
      </p>

      <div className="flex min-h-10 items-center rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface-secondary)] px-3 text-xs text-[var(--afra-text-primary)]">
        {value}
      </div>
    </div>
  );
}

function ThemeOption({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-3 rounded-[10px] border p-4 text-right transition-colors ${
        active
          ? "border-[var(--afra-primary)] bg-[var(--afra-primary-soft)]"
          : "border-[var(--afra-border)] bg-[var(--afra-surface)] hover:bg-[var(--afra-surface-hover)]"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] ${
          active
            ? "bg-[var(--afra-primary)] text-white"
            : "bg-[var(--afra-surface-secondary)] text-[var(--afra-text-secondary)]"
        }`}
      >
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-[var(--afra-text-primary)]">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
          {description}
        </p>
      </div>

      {active && (
        <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--afra-primary)] text-white">
          <Check size={12} />
        </div>
      )}
    </button>
  );
}

function NotificationRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="text-xs font-medium text-[var(--afra-text-primary)]">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-[var(--afra-text-muted)]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked
            ? "bg-[var(--afra-primary)]"
            : "bg-[var(--afra-border-strong)]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            checked ? "right-1" : "right-6"
          }`}
        />
      </button>
    </div>
  );
}

function SecurityRow({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[var(--afra-surface-secondary)] text-[var(--afra-text-secondary)]">
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-[var(--afra-text-primary)]">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
          {description}
        </p>
      </div>

      <button
        type="button"
        className="shrink-0 text-[11px] font-medium text-[var(--afra-primary)] hover:underline"
      >
        {action}
      </button>
    </div>
  );
}

function SystemInfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11px] text-[var(--afra-text-muted)]">
        {label}
      </span>

      <span className="text-right text-[11px] font-medium text-[var(--afra-text-primary)]">
        {value}
      </span>
    </div>
  );
}