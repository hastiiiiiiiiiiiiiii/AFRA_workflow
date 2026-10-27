export const paymentRequest = {
  id: "AF-1024",
  project: "خرید تجهیزات پروژه پارس",
  supplier: "شرکت تجهیزات نوین",
  invoice: "INV-4582",
  requestDate: "۱۴۰۵/۰۶/۲۴",
  department: "واحد پروژه",
  description: "خرید تجهیزات مورد نیاز پروژه پارس",
  amount: 250000000,

  payment: {
    paidAmount: "",
    date: "",
    status: "پرداخت نشده",
    note: "",
    receipt: null,
  },
};

export const paymentStatusOptions = [
  {
    value: "paid",
    label: "پرداخت کامل",
  },
  {
    value: "partial",
    label: "پرداخت ناقص",
  },
  {
    value: "unpaid",
    label: "پرداخت نشده",
  },
];

export function formatRial(value) {
  return new Intl.NumberFormat("fa-IR").format(Number(value || 0));
}