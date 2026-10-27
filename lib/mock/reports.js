export const reportSummary = {
  totalRequests: 24,
  completedRequests: 12,
  pendingRequests: 7,
  returnedRequests: 5,
  totalAmount: 4850000000,
  paidAmount: 3920000000,
};

export const statusDistribution = [
  {
    label: "تکمیل‌شده",
    value: 12,
    type: "success",
  },
  {
    label: "در حال بررسی",
    value: 5,
    type: "info",
  },
  {
    label: "در انتظار پرداخت",
    value: 2,
    type: "warning",
  },
  {
    label: "برگشت‌خورده",
    value: 5,
    type: "danger",
  },
];

export const monthlyReport = [
  {
    month: "فروردین",
    requests: 3,
    completed: 2,
    amount: 420000000,
  },
  {
    month: "اردیبهشت",
    requests: 4,
    completed: 2,
    amount: 680000000,
  },
  {
    month: "خرداد",
    requests: 5,
    completed: 3,
    amount: 910000000,
  },
  {
    month: "تیر",
    requests: 3,
    completed: 2,
    amount: 540000000,
  },
  {
    month: "مرداد",
    requests: 4,
    completed: 2,
    amount: 760000000,
  },
  {
    month: "شهریور",
    requests: 5,
    completed: 3,
    amount: 1540000000,
  },
];

export const departmentReport = [
  {
    department: "مالی",
    requests: 8,
    completed: 5,
    pending: 2,
    amount: 1780000000,
  },
  {
    department: "پروژه‌ها",
    requests: 7,
    completed: 3,
    pending: 3,
    amount: 1460000000,
  },
  {
    department: "تدارکات",
    requests: 5,
    completed: 2,
    pending: 2,
    amount: 820000000,
  },
  {
    department: "منابع انسانی",
    requests: 2,
    completed: 1,
    pending: 0,
    amount: 310000000,
  },
  {
    department: "فناوری اطلاعات",
    requests: 2,
    completed: 1,
    pending: 0,
    amount: 280000000,
  },
];

export const topSuppliers = [
  {
    name: "شرکت تجهیزات نوین",
    requests: 5,
    amount: 1240000000,
  },
  {
    name: "گروه صنعتی پارس",
    requests: 4,
    amount: 970000000,
  },
  {
    name: "شرکت بازرگانی آریا",
    requests: 3,
    amount: 620000000,
  },
  {
    name: "تأمین‌کنندگان افرا",
    requests: 3,
    amount: 510000000,
  },
  {
    name: "شرکت توسعه سازان",
    requests: 2,
    amount: 390000000,
  },
];

export const recentReportRequests = [
  {
    id: "AF-1024",
    project: "خرید تجهیزات پروژه پارس",
    department: "پروژه‌ها",
    amount: 250000000,
    status: "تکمیل‌شده",
    statusType: "success",
  },
  {
    id: "AF-1023",
    project: "خرید تجهیزات اداری",
    department: "مالی",
    amount: 185000000,
    status: "در انتظار پرداخت",
    statusType: "warning",
  },
  {
    id: "AF-1022",
    project: "تأمین تجهیزات فنی",
    department: "تدارکات",
    amount: 420000000,
    status: "در بررسی نهایی",
    statusType: "info",
  },
  {
    id: "AF-1021",
    project: "خدمات پشتیبانی پروژه",
    department: "پروژه‌ها",
    amount: 315000000,
    status: "برگشت‌خورده",
    statusType: "danger",
  },
  {
    id: "AF-1020",
    project: "خرید ملزومات فناوری",
    department: "فناوری اطلاعات",
    amount: 275000000,
    status: "تکمیل‌شده",
    statusType: "success",
  },
];

export function formatRial(value) {
  return new Intl.NumberFormat("fa-IR").format(value);
}