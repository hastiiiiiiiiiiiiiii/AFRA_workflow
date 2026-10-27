"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!identifier.trim()) {
      setError("نام کاربری یا شماره موبایل را وارد کنید.");
      return;
    }

    if (!password) {
      setError("رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, rememberMe }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setError(result.error || "نام کاربری یا رمز عبور صحیح نیست.");
        return;
      }
      localStorage.setItem("afra-user", JSON.stringify(result.data));
      router.push("/");
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--afra-background)]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
        {/* Brand Side */}
        <section className="relative hidden overflow-hidden bg-[var(--afra-primary)] lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full border border-white/10" />
            <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full border border-white/5" />
          </div>

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-white text-sm font-bold text-[var(--afra-primary)]">
                  A
                </div>

                <div>
                  <div className="text-base font-bold text-white">
                    AFRA
                  </div>
                  <div className="mt-0.5 text-[10px] text-white/60">
                    هلدینگ افرا
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[470px]">
              <div className="mb-5 h-px w-12 bg-white/30" />

              <p className="text-xs font-medium text-white/60">
                سامانه مدیریت فرآیندهای داخلی
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-[1.7] text-white xl:text-4xl">
                مدیریت فرآیندها،
                <br />
                ساده و یکپارچه
              </h1>

              <p className="mt-5 max-w-[410px] text-sm leading-8 text-white/65">
                محیط داخلی مدیریت درخواست‌ها، بررسی، پرداخت و تأیید
                فرآیندهای هلدینگ افرا.
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/40">
              <span>سامانه داخلی افرا</span>
              <span>© ۱۴۰۵ هلدینگ افرا</span>
            </div>
          </div>
        </section>

        {/* Login Side */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[430px]">
            {/* Mobile Brand */}
            <div className="mb-10 flex items-center justify-center lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-[var(--afra-primary)] text-sm font-bold text-white">
                  A
                </div>

                <div className="leading-tight">
                  <div className="text-base font-bold">AFRA</div>
                  <div className="mt-0.5 text-[10px] text-[var(--afra-text-muted)]">
                    هلدینگ افرا
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[11px] font-medium text-[var(--afra-primary)]">
                ورود به سامانه
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                خوش آمدید
              </h2>

              <p className="mt-2 text-xs leading-6 text-[var(--afra-text-secondary)]">
                برای ورود به سامانه داخلی افرا، اطلاعات حساب خود را
                وارد کنید.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Identifier */}
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-xs font-bold"
                >
                  نام کاربری یا شماره موبایل
                </label>

                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    setError("");
                  }}
                  placeholder="نام کاربری یا شماره موبایل"
                  autoComplete="username"
                  className="
                    h-12 w-full rounded-[10px]
                    border border-[var(--afra-border)]
                    bg-[var(--afra-surface)]
                    px-4 text-xs
                    text-[var(--afra-text-primary)]
                    outline-none
                    transition-colors
                    placeholder:text-[var(--afra-text-muted)]
                    focus:border-[var(--afra-primary)]
                    focus:ring-2
                    focus:ring-[var(--afra-primary)]/10
                  "
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold"
                  >
                    رمز عبور
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="رمز عبور خود را وارد کنید"
                    autoComplete="current-password"
                    className="
                      h-12 w-full rounded-[10px]
                      border border-[var(--afra-border)]
                      bg-[var(--afra-surface)]
                      px-4 pl-14 text-xs
                      text-[var(--afra-text-primary)]
                      outline-none
                      transition-colors
                      placeholder:text-[var(--afra-text-muted)]
                      focus:border-[var(--afra-primary)]
                      focus:ring-2
                      focus:ring-[var(--afra-primary)]/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      px-2 py-1
                      text-[10px] font-medium
                      text-[var(--afra-text-muted)]
                      hover:text-[var(--afra-text-primary)]
                    "
                  >
                    {showPassword ? "مخفی" : "نمایش"}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 accent-[var(--afra-primary)]"
                />

                <span className="text-[11px] text-[var(--afra-text-secondary)]">
                  مرا به خاطر بسپار
                </span>
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-[10px] border border-[var(--afra-danger)]/20 bg-[var(--afra-danger-soft)] px-3.5 py-3">
                  <div className="text-[11px] font-medium leading-6 text-[var(--afra-danger)]">
                    {error}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  flex h-12 w-full
                  items-center justify-center
                  rounded-[10px]
                  bg-[var(--afra-primary)]
                  text-xs font-bold text-white
                  transition-colors
                  hover:bg-[var(--afra-primary-hover)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "در حال ورود..." : "ورود به سامانه"}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-8 border-t border-[var(--afra-border)] pt-5">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--afra-surface-secondary)] text-xs">
                  ◉
                </div>

                <div>
                  <p className="text-[10px] font-bold">
                    محیط داخلی و امن
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-[var(--afra-text-muted)]">
                    دسترسی به اطلاعات و فرآیندها بر اساس سطح دسترسی
                    کاربر انجام می‌شود.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="mt-10 text-center text-[9px] text-[var(--afra-text-muted)] lg:hidden">
              سامانه مدیریت فرآیندهای داخلی هلدینگ افرا
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}