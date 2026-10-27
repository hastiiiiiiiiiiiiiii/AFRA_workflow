export const finalApprovalRequest = {
  id: "AF-1024",

  project: "خرید تجهیزات پروژه پارس",
  supplier: "شرکت تجهیزات نوین",
  invoice: "INV-4582",
  requestNumber: "REQ-1405-1024",
  requestDate: "۱۴۰۵/۰۶/۲۴",
  department: "واحد پروژه",
  purchaseType: "خرید تجهیزات",

  description:
    "خرید تجهیزات مورد نیاز پروژه پارس مطابق درخواست واحد پروژه.",

  amount: 250000000,

  items: [
    {
      row: 1,
      description: "تجهیزات شبکه",
      quantity: 2,
      unit: "دستگاه",
      unitPrice: 80000000,
      total: 160000000,
    },
    {
      row: 2,
      description: "تجهیزات جانبی",
      quantity: 5,
      unit: "عدد",
      unitPrice: 18000000,
      total: 90000000,
    },
  ],

  payment: {
    paidAmount: 250000000,
    date: "۱۴۰۵/۰۶/۲۶",
    status: "پرداخت کامل",
    receipt: {
      name: "payment-receipt-AF-1024.pdf",
      size: 184320,
      type: "application/pdf",
    },
  },

  approvals: [
    {
      id: 1,
      role: "بررسی‌کننده اولیه",
      user: "کارشناس بررسی",
      action: "تأیید بررسی اولیه",
      date: "۱۴۰۵/۰۶/۲۵ - ۱۱:۴۸",
    },
    {
      id: 2,
      role: "مسئول پرداخت",
      user: "مسئول پرداخت",
      action: "ثبت پرداخت",
      date: "۱۴۰۵/۰۶/۲۶ - ۱۲:۱۰",
    },
    {
      id: 3,
      role: "کنترل پرداخت",
      user: "کنترل‌کننده پرداخت",
      action: "تأیید پرداخت",
      date: "۱۴۰۵/۰۶/۲۶ - ۱۲:۲۵",
    },
    {
      id: 4,
      role: "بررسی نهایی",
      user: "بازبین نهایی",
      action: "تأیید بررسی نهایی",
      date: "۱۴۰۵/۰۶/۲۶ - ۱۲:۴۸",
    },
  ],

  finalChecks: [
    {
      id: "request",
      title: "اطلاعات درخواست بررسی شده است",
    },
    {
      id: "financial",
      title: "اطلاعات مالی و مبلغ پرداخت کنترل شده است",
    },
    {
      id: "receipt",
      title: "رسید پرداخت بررسی شده است",
    },
    {
      id: "workflow",
      title: "تمام مراحل قبلی فرآیند تکمیل شده است",
    },
  ],
};

export function formatRial(value) {
  return new Intl.NumberFormat("fa-IR").format(Number(value || 0));
}