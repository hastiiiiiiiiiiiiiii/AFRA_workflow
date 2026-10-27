export const paymentVerificationRequest = {
  id: "AF-1024",
  project: "خرید تجهیزات پروژه پارس",
  supplier: "شرکت تجهیزات نوین",
  invoice: "INV-4582",
  requestDate: "۱۴۰۵/۰۶/۲۴",
  department: "واحد پروژه",

  amount: 250000000,

  payment: {
    paidAmount: 250000000,
    date: "۱۴۰۵/۰۶/۲۶",
    status: "پرداخت کامل",
    note: "پرداخت طبق اطلاعات درخواست انجام شد.",
    receipt: {
      name: "payment-receipt-AF-1024.pdf",
      size: 184320,
      type: "application/pdf",
    },
  },

  paymentOfficer: {
    name: "مسئول پرداخت",
    role: "PAYMENT_OFFICER",
    registeredAt: "۱۴۰۵/۰۶/۲۶ - ۱۲:۱۰",
  },
};

export const verificationChecks = [
  {
    id: "amount",
    title: "مبلغ پرداختی",
    description: "مبلغ پرداخت‌شده با مبلغ درخواست مطابقت دارد.",
  },
  {
    id: "date",
    title: "تاریخ پرداخت",
    description: "تاریخ انجام پرداخت ثبت شده است.",
  },
  {
    id: "receipt",
    title: "رسید پرداخت",
    description: "رسید پرداخت به صورت PDF ثبت شده است.",
  },
  {
    id: "status",
    title: "وضعیت پرداخت",
    description: "وضعیت پرداخت به صورت کامل ثبت شده است.",
  },
];

export function formatRial(value) {
  return new Intl.NumberFormat("fa-IR").format(Number(value || 0));
}