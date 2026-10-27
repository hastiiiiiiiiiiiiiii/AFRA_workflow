export const finalReviewRequest = {
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
    note: "پرداخت طبق اطلاعات درخواست انجام شد.",
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
      status: "approved",
    },
    {
      id: 2,
      role: "مسئول پرداخت",
      user: "مسئول پرداخت",
      action: "ثبت پرداخت",
      date: "۱۴۰۵/۰۶/۲۶ - ۱۲:۱۰",
      status: "approved",
    },
    {
      id: 3,
      role: "کنترل پرداخت",
      user: "کنترل‌کننده پرداخت",
      action: "تأیید پرداخت",
      date: "۱۴۰۵/۰۶/۲۶ - ۱۲:۲۵",
      status: "approved",
    },
  ],

  activities: [
    {
      text: "تأیید بررسی اولیه",
      user: "کارشناس بررسی",
      date: "۱۴۰۵/۰۶/۲۵ - ۱۱:۴۸",
    },
    {
      text: "ثبت پرداخت",
      user: "مسئول پرداخت",
      date: "۱۴۰۵/۰۶/۲۶ - ۱۲:۱۰",
    },
    {
      text: "تأیید پرداخت",
      user: "کنترل‌کننده پرداخت",
      date: "۱۴۰۵/۰۶/۲۶ - ۱۲:۲۵",
    },
  ],
};

export const finalReviewChecks = [
  {
    id: "request",
    title: "اطلاعات درخواست",
    description:
      "مشخصات پروژه، تأمین‌کننده، فاکتور و اطلاعات پایه بررسی شده است.",
  },
  {
    id: "items",
    title: "اقلام درخواست",
    description:
      "اقلام، تعداد، قیمت واحد و مبلغ نهایی با درخواست مطابقت دارد.",
  },
  {
    id: "payment",
    title: "اطلاعات پرداخت",
    description:
      "مبلغ پرداخت‌شده و وضعیت پرداخت بررسی شده است.",
  },
  {
    id: "receipt",
    title: "رسید پرداخت",
    description:
      "رسید پرداخت در پرونده موجود و قابل بررسی است.",
  },
  {
    id: "approvals",
    title: "تأییدهای قبلی",
    description:
      "مراحل قبلی فرآیند به صورت کامل طی شده است.",
  },
];

export function formatRial(value) {
  return new Intl.NumberFormat("fa-IR").format(Number(value || 0));
}