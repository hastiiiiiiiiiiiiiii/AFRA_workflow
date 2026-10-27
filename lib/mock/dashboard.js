export const dashboardStats = {
  totalRequests: 24,
  completed: 12,
  inReview: 5,
  returned: 5,
};

export const roleDashboardData = {
  ACCOUNTANT: {
    title: "درخواست‌های من",
    subtitle: "درخواست‌هایی که ایجاد یا برای اصلاح به شما برگشت داده شده‌اند",

    stats: {
      primaryLabel: "درخواست‌های ایجادشده",
      primaryValue: 14,

      secondaryLabel: "نیازمند اصلاح",
      secondaryValue: 2,
    },

    tasks: [
      {
        id: "AF-1021",
        project: "خدمات پشتیبانی پروژه",
        supplier: "گروه صنعتی پارس",
        amount: 315000000,
        stage: "نیازمند اصلاح",
        priority: "فوری",
        priorityType: "urgent",
      },

      {
        id: "AF-1019",
        project: "خرید تجهیزات اداری",
        supplier: "شرکت توسعه سازان",
        amount: 185000000,
        stage: "پیش‌نویس",
        priority: "عادی",
        priorityType: "normal",
      },
    ],
  },

  FIRST_REVIEWER: {
    title: "وظایف بررسی اولیه",
    subtitle: "درخواست‌هایی که منتظر بررسی اولیه شما هستند",

    stats: {
      primaryLabel: "در انتظار بررسی",
      primaryValue: 7,

      secondaryLabel: "فوری",
      secondaryValue: 2,
    },

    tasks: [
      {
        id: "AF-1024",
        project: "خرید تجهیزات پروژه پارس",
        supplier: "شرکت تجهیزات نوین",
        amount: 250000000,
        stage: "بررسی اولیه",
        priority: "عادی",
        priorityType: "normal",
      },

      {
        id: "AF-1021",
        project: "خدمات پشتیبانی پروژه",
        supplier: "گروه صنعتی پارس",
        amount: 315000000,
        stage: "بررسی اولیه",
        priority: "فوری",
        priorityType: "urgent",
      },
    ],
  },

  PAYMENT_OFFICER: {
    title: "وظایف پرداخت",
    subtitle: "درخواست‌هایی که نیازمند انجام و ثبت پرداخت هستند",

    stats: {
      primaryLabel: "در انتظار پرداخت",
      primaryValue: 4,

      secondaryLabel: "مبلغ قابل پرداخت",
      secondaryValue: 1280000000,
    },

    tasks: [
      {
        id: "AF-1023",
        project: "خرید تجهیزات اداری",
        supplier: "شرکت توسعه سازان",
        amount: 185000000,
        stage: "در انتظار پرداخت",
        priority: "فوری",
        priorityType: "urgent",
      },

      {
        id: "AF-1020",
        project: "تأمین تجهیزات فنی",
        supplier: "گروه صنعتی پارس",
        amount: 420000000,
        stage: "در انتظار پرداخت",
        priority: "عادی",
        priorityType: "normal",
      },
    ],
  },

  PAYMENT_CONTROLLER: {
    title: "کنترل پرداخت",
    subtitle: "پرداخت‌هایی که نیازمند بررسی و تأیید شما هستند",

    stats: {
      primaryLabel: "در انتظار کنترل",
      primaryValue: 3,

      secondaryLabel: "پرداخت امروز",
      secondaryValue: 2,
    },

    tasks: [
      {
        id: "AF-1024",
        project: "خرید تجهیزات پروژه پارس",
        supplier: "شرکت تجهیزات نوین",
        amount: 250000000,
        stage: "کنترل پرداخت",
        priority: "عادی",
        priorityType: "normal",
      },

      {
        id: "AF-1017",
        project: "خرید ملزومات فنی",
        supplier: "شرکت بازرگانی آریا",
        amount: 190000000,
        stage: "کنترل پرداخت",
        priority: "فوری",
        priorityType: "urgent",
      },
    ],
  },

  FINAL_AUTHORITY: {
    title: "بررسی‌های نهایی",
    subtitle: "درخواست‌هایی که نیازمند بررسی کامل شما هستند",

    stats: {
      primaryLabel: "در انتظار بررسی",
      primaryValue: 5,

      secondaryLabel: "فوری",
      secondaryValue: 1,
    },

    tasks: [
      {
        id: "AF-1022",
        project: "تأمین تجهیزات فنی",
        supplier: "گروه صنعتی پارس",
        amount: 420000000,
        stage: "بررسی نهایی",
        priority: "عادی",
        priorityType: "normal",
      },

      {
        id: "AF-1018",
        project: "خرید ملزومات اداری",
        supplier: "شرکت بازرگانی آریا",
        amount: 185000000,
        stage: "بررسی نهایی",
        priority: "فوری",
        priorityType: "urgent",
      },
    ],
  },

  FINAL_AUTHORITY: {
    title: "تأییدهای نهایی",
    subtitle: "درخواست‌هایی که آماده تأیید نهایی هستند",

    stats: {
      primaryLabel: "در انتظار تأیید",
      primaryValue: 3,

      secondaryLabel: "تأییدشده امروز",
      secondaryValue: 2,
    },

    tasks: [
      {
        id: "AF-1024",
        project: "خرید تجهیزات پروژه پارس",
        supplier: "شرکت تجهیزات نوین",
        amount: 250000000,
        stage: "تأیید نهایی",
        priority: "عادی",
        priorityType: "normal",
      },

      {
        id: "AF-1016",
        project: "خدمات اجرایی پروژه",
        supplier: "شرکت خدمات گستر",
        amount: 275000000,
        stage: "تأیید نهایی",
        priority: "فوری",
        priorityType: "urgent",
      },
    ],
  },
};

export const requestOverview = [
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

export const recentRequests = [
  {
    id: "AF-1024",
    project: "خرید تجهیزات پروژه پارس",
    supplier: "شرکت تجهیزات نوین",
    amount: 250000000,
    status: "در انتظار بررسی اولیه",
    statusType: "info",
    date: "۱۴۰۵/۰۶/۲۶",
  },

  {
    id: "AF-1023",
    project: "خرید تجهیزات اداری",
    supplier: "شرکت توسعه سازان",
    amount: 185000000,
    status: "در انتظار پرداخت",
    statusType: "warning",
    date: "۱۴۰۵/۰۶/۲۶",
  },

  {
    id: "AF-1022",
    project: "تأمین تجهیزات فنی",
    supplier: "گروه صنعتی پارس",
    amount: 420000000,
    status: "بررسی نهایی",
    statusType: "info",
    date: "۱۴۰۵/۰۶/۲۵",
  },

  {
    id: "AF-1021",
    project: "خدمات پشتیبانی پروژه",
    supplier: "شرکت تجهیزات نوین",
    amount: 315000000,
    status: "برگشت‌خورده",
    statusType: "danger",
    date: "۱۴۰۵/۰۶/۲۵",
  },
];

export const recentActivities = [
  {
    id: "ACT-001",
    user: "مقام تأیید نهایی",
    action: "تأیید نهایی",
    description: "درخواست AF-1024 تأیید نهایی شد.",
    time: "۱۳:۰۵",
    type: "success",
    requestId: "AF-1024",
  },

  {
    id: "ACT-002",
    user: "مدیر عامل",
    action: "تأیید بررسی",
    description: "بررسی نهایی درخواست AF-1024 تأیید شد.",
    time: "۱۲:۴۸",
    type: "success",
    requestId: "AF-1024",
  },

  {
    id: "ACT-003",
    user: "کنترل‌کننده پرداخت",
    action: "تأیید پرداخت",
    description: "پرداخت درخواست AF-1024 تأیید شد.",
    time: "۱۲:۲۵",
    type: "payment",
    requestId: "AF-1024",
  },

  {
    id: "ACT-004",
    user: "مسئول پرداخت",
    action: "ثبت پرداخت",
    description: "پرداخت درخواست AF-1024 ثبت شد.",
    time: "۱۲:۱۰",
    type: "payment",
    requestId: "AF-1024",
  },

  {
    id: "ACT-005",
    user: "کارشناس بررسی",
    action: "تأیید اولیه",
    description: "درخواست AF-1024 تأیید اولیه شد.",
    time: "۱۱:۴۸",
    type: "success",
    requestId: "AF-1024",
  },
];

export const dashboardDate = "پنجشنبه ۲۶ شهریور ۱۴۰۵";

export function formatRial(value) {
  return new Intl.NumberFormat("fa-IR").format(value);
}