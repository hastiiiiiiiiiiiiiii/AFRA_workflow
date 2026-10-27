export default function HomePage() {
  return (
    <div className="min-h-full p-4 sm:p-5 lg:p-7">
      <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-6 sm:p-8">
        <p className="text-xs font-medium text-[var(--afra-text-muted)]">
          سامانه داخلی افرا
        </p>

        <h1 className="mt-2 text-xl font-bold text-[var(--afra-text-primary)] sm:text-2xl">
          به سامانه داخلی هلدینگ افرا خوش آمدید
        </h1>

        <p className="mt-2 text-sm text-[var(--afra-text-secondary)]">
          برای مشاهده وضعیت درخواست‌ها و وظایف خود، از منوی داشبورد استفاده کنید.
        </p>
      </div>
    </div>
  );
}