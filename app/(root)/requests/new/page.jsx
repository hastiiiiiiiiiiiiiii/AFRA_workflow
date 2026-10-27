"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { emptyItem, emptyRequest } from "@/lib/mock/new-request";

const inputClass =
  "mt-1.5 h-10 w-full rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 text-xs text-[var(--afra-text-primary)] outline-none placeholder:text-[var(--afra-text-muted)] focus:border-[var(--afra-primary)]";

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="text-[10px] font-bold text-[var(--afra-text-secondary)]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function NewRequestPage() {
  const [form, setForm] = useState(emptyRequest);
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const updateItem = (index, field, value) => {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );

    setSaved(false);
  };

  const addItem = () => {
    setItems((current) => [...current, { ...emptyItem }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;

    setItems((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;

      return sum + quantity * unitPrice;
    }, 0);
  }, [items]);

  const formatNumber = (value) => {
    return new Intl.NumberFormat("fa-IR").format(value);
  };

  const saveRequest = async (submit) => {
    setLoading(true); setError(""); setSaved(false);
    try {
      const response = await fetch("/api/requests", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,amount:totalAmount,items})});
      const result = await response.json();
      if(!response.ok || !result.ok) throw new Error(result.error || "ذخیره درخواست ناموفق بود.");
      if(submit){
        const actionResponse = await fetch(`/api/requests/${result.data.id}/actions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"EDIT_REQUEST"})});
        const actionResult = await actionResponse.json();
        if(!actionResponse.ok || !actionResult.ok) throw new Error(actionResult.error || "ارسال درخواست ناموفق بود.");
      }
      setSaved(true); router.push(`/requests/${result.data.id}`);
      router.refresh();
    } catch(e){ setError(e.message); } finally { setLoading(false); }
  };
  const handleSaveDraft = () => saveRequest(false);
  const handleSubmit = () => saveRequest(true);

  return (
    <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6">
        <Link
          href="/requests"
          className="text-[11px] font-medium text-[var(--afra-text-muted)] hover:text-[var(--afra-primary)]"
        >
          ← بازگشت به درخواست‌ها
        </Link>

        <div className="mt-4">
          <p className="text-[11px] font-medium text-[var(--afra-primary)]">
            مدیریت فرآیند
          </p>

          <h1 className="mt-1 text-xl font-bold sm:text-2xl">
            ثبت درخواست جدید
          </h1>

          <p className="mt-1 text-xs text-[var(--afra-text-secondary)]">
            اطلاعات درخواست و اقلام مورد نیاز را وارد کنید.
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">

        {/* Main Form */}
        <div className="space-y-5">

          {/* Basic Information */}
          <section className="overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
            <div className="border-b border-[var(--afra-border)] px-4 py-4 sm:px-5">
              <h2 className="text-sm font-bold">
                اطلاعات اصلی درخواست
              </h2>

              <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                مشخصات کلی درخواست را وارد کنید.
              </p>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 sm:p-5">

              <Field label="نام پروژه *">
                <input
                  value={form.project}
                  onChange={(e) =>
                    updateForm("project", e.target.value)
                  }
                  placeholder="مثلاً پروژه پارس"
                  className={inputClass}
                />
              </Field>

              <Field label="نام تأمین‌کننده *">
                <input
                  value={form.supplier}
                  onChange={(e) =>
                    updateForm("supplier", e.target.value)
                  }
                  placeholder="نام شرکت یا تأمین‌کننده"
                  className={inputClass}
                />
              </Field>

              <Field label="شماره فاکتور">
                <input
                  value={form.invoice}
                  onChange={(e) =>
                    updateForm("invoice", e.target.value)
                  }
                  placeholder="شماره فاکتور"
                  className={inputClass}
                />
              </Field>

              <Field label="شماره درخواست">
                <input
                  value={form.requestNumber}
                  onChange={(e) =>
                    updateForm("requestNumber", e.target.value)
                  }
                  placeholder="در صورت وجود"
                  className={inputClass}
                />
              </Field>

              <Field label="تاریخ درخواست *">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    updateForm("date", e.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="واحد / دپارتمان *">
                <select
                  value={form.department}
                  onChange={(e) =>
                    updateForm("department", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">انتخاب واحد</option>
                  <option value="مالی">مالی</option>
                  <option value="منابع انسانی">منابع انسانی</option>
                  <option value="فناوری اطلاعات">فناوری اطلاعات</option>
                  <option value="عملیات">عملیات</option>
                  <option value="مدیریت">مدیریت</option>
                </select>
              </Field>

              <Field label="نوع خرید *">
                <select
                  value={form.purchaseType}
                  onChange={(e) =>
                    updateForm("purchaseType", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">انتخاب نوع خرید</option>
                  <option value="خرید تجهیزات">خرید تجهیزات</option>
                  <option value="خرید کالا">خرید کالا</option>
                  <option value="خدمات">خدمات</option>
                  <option value="سایر">سایر</option>
                </select>
              </Field>

              <Field
                label="شرح کلی درخواست"
                className="sm:col-span-2 lg:col-span-2"
              >
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateForm("description", e.target.value)
                  }
                  placeholder="توضیحات کلی مربوط به درخواست..."
                  className="mt-1.5 min-h-[92px] w-full resize-y rounded-[9px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 py-2.5 text-xs outline-none placeholder:text-[var(--afra-text-muted)] focus:border-[var(--afra-primary)]"
                />
              </Field>
            </div>
          </section>

          {/* Items */}
          <section className="overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">

            <div className="flex flex-col gap-3 border-b border-[var(--afra-border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <h2 className="text-sm font-bold">
                  اقلام درخواست
                </h2>

                <p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">
                  کالاها یا خدمات مورد نیاز را اضافه کنید.
                </p>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="rounded-[9px] border border-[var(--afra-primary)] px-3 py-2 text-[10px] font-bold text-[var(--afra-primary)] hover:bg-[var(--afra-primary-soft)]"
              >
                + افزودن قلم
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-right">
                <thead>
                  <tr className="border-b border-[var(--afra-border)] bg-[var(--afra-surface-secondary)]">
                    <th className="w-12 px-3 py-3 text-[10px] text-[var(--afra-text-muted)]">
                      #
                    </th>

                    <th className="px-3 py-3 text-[10px] text-[var(--afra-text-muted)]">
                      شرح کالا / خدمت
                    </th>

                    <th className="w-28 px-3 py-3 text-[10px] text-[var(--afra-text-muted)]">
                      تعداد / حجم
                    </th>

                    <th className="w-40 px-3 py-3 text-[10px] text-[var(--afra-text-muted)]">
                      مبلغ واحد
                    </th>

                    <th className="w-40 px-3 py-3 text-[10px] text-[var(--afra-text-muted)]">
                      مبلغ کل
                    </th>

                    <th className="w-20 px-3 py-3 text-[10px] text-[var(--afra-text-muted)]">
                      حذف
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => {
                    const rowTotal =
                      (Number(item.quantity) || 0) *
                      (Number(item.unitPrice) || 0);

                    return (
                      <tr
                        key={index}
                        className="border-b border-[var(--afra-border)] last:border-0"
                      >
                        <td className="px-3 py-3 text-xs font-bold text-[var(--afra-text-muted)]">
                          {index + 1}
                        </td>

                        <td className="px-3 py-3">
                          <input
                            value={item.title}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="شرح کالا یا خدمت"
                            className="h-9 w-full rounded-[8px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-2.5 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                          />

                          <input
                            value={item.description}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="توضیحات"
                            className="mt-2 h-8 w-full rounded-[8px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-2.5 text-[10px] outline-none focus:border-[var(--afra-primary)]"
                          />
                        </td>

                        <td className="px-3 py-3">
                          <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            placeholder="0"
                            className="h-9 w-full rounded-[8px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-2.5 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                          />
                        </td>

                        <td className="px-3 py-3">
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "unitPrice",
                                e.target.value
                              )
                            }
                            placeholder="0"
                            className="h-9 w-full rounded-[8px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-2.5 text-[11px] outline-none focus:border-[var(--afra-primary)]"
                          />
                        </td>

                        <td className="px-3 py-3">
                          <div className="rounded-[8px] bg-[var(--afra-surface-secondary)] px-3 py-2 text-xs font-bold">
                            {formatNumber(rowTotal)}
                            <span className="mr-1 text-[9px] font-normal text-[var(--afra-text-muted)]">
                              ریال
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            disabled={items.length === 1}
                            className="rounded-[8px] px-2.5 py-2 text-[10px] font-bold text-[var(--afra-danger)] hover:bg-[var(--afra-danger-soft)] disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr className="bg-[var(--afra-surface-secondary)]">
                    <td
                      colSpan="4"
                      className="px-4 py-4 text-xs font-bold"
                    >
                      مبلغ کل درخواست
                    </td>

                    <td
                      colSpan="2"
                      className="px-3 py-4 text-sm font-bold text-[var(--afra-primary)]"
                    >
                      {formatNumber(totalAmount)}
                      <span className="mr-1 text-[9px] font-normal">
                        ریال
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>

        {/* Summary / Actions */}
        <aside className="space-y-5">

          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
            <h2 className="text-sm font-bold">
              خلاصه درخواست
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--afra-text-muted)]">
                  تعداد اقلام
                </span>

                <span className="text-xs font-bold">
                  {items.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--afra-text-muted)]">
                  مبلغ کل
                </span>

                <span className="text-xs font-bold text-[var(--afra-primary)]">
                  {formatNumber(totalAmount)} ریال
                </span>
              </div>

              <div className="h-px bg-[var(--afra-border)]" />

              <div className="rounded-[10px] bg-[var(--afra-primary-soft)] p-3">
                <div className="text-[10px] font-bold text-[var(--afra-primary)]">
                  وضعیت
                </div>

                <div className="mt-1 text-[10px] text-[var(--afra-text-secondary)]">
                  پیش‌نویس
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-4 shadow-[var(--afra-shadow-sm)]">
            <h2 className="text-sm font-bold">
              ذخیره و ارسال
            </h2>

            <p className="mt-1 text-[10px] leading-6 text-[var(--afra-text-muted)]">
              ابتدا می‌توانید درخواست را به‌صورت پیش‌نویس ذخیره کنید و بعداً آن را تکمیل کنید.
            </p>

            {error && (
              <div className="mt-4 rounded-[9px] bg-[var(--afra-danger-soft)] px-3 py-2 text-[10px] font-medium text-[var(--afra-danger)]">
                {error}
              </div>
            )}

            {saved && (
              <div className="mt-4 rounded-[9px] bg-[var(--afra-success-soft)] px-3 py-2 text-[10px] font-medium text-[var(--afra-success)]">
                ✓ اطلاعات درخواست ذخیره شد.
              </div>
            )}

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="w-full rounded-[9px] border border-[var(--afra-border)] px-3 py-2.5 text-xs font-bold hover:bg-[var(--afra-surface-secondary)]"
              >
                ذخیره پیش‌نویس
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-[9px] bg-[var(--afra-primary)] px-3 py-2.5 text-xs font-bold text-white hover:bg-[var(--afra-primary-hover)]"
              >
                {loading ? "در حال ذخیره..." : "ثبت و ارسال برای بررسی"}
              </button>
            </div>
          </section>

          <div className="rounded-[12px] border border-[var(--afra-border)] bg-[var(--afra-surface-secondary)] p-3">
            <div className="text-[10px] font-bold">
              نکته
            </div>

            <p className="mt-1 text-[10px] leading-6 text-[var(--afra-text-secondary)]">
              مبلغ کل هر قلم به‌صورت خودکار از حاصل‌ضرب تعداد در مبلغ واحد محاسبه می‌شود.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}