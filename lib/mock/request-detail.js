export const requestDetails = {
  "AF-1024": {
    id: "AF-1024",
    project: "خرید تجهیزات پروژه پارس",
    supplier: "شرکت تجهیزات نوین",
    invoice: "INV-4582",
    requestNumber: "REQ-1405-1024",
    date: "۱۴۰۵/۰۶/۲۴",
    department: "واحد مالی",
    purchaseType: "خرید تجهیزات",
    description: "تأمین تجهیزات مورد نیاز پروژه پارس",
    amount: "۲۵۰,۰۰۰,۰۰۰",
    status: "در انتظار بررسی",
    statusType: "warning",

    items: [
      {
        id: 1,
        title: "مانیتور حرفه‌ای",
        quantity: "۴",
        unitPrice: "۳۰,۰۰۰,۰۰۰",
        total: "۱۲۰,۰۰۰,۰۰۰",
        description: "مانیتور مورد نیاز واحد طراحی",
      },
      {
        id: 2,
        title: "لپ‌تاپ کاری",
        quantity: "۲",
        unitPrice: "۶۵,۰۰۰,۰۰۰",
        total: "۱۳۰,۰۰۰,۰۰۰",
        description: "سیستم مورد نیاز پروژه",
      },
    ],

    payment: {
      amount: "۲۵۰,۰۰۰,۰۰۰",
      paidAmount: "۲۵۰,۰۰۰,۰۰۰",
      status: "پرداخت‌شده",
      statusType: "success",
      date: "۱۴۰۵/۰۶/۲۵ - ۱۰:۳۲",
      receipt: {
        name: "receipt-AF-1024.pdf",
        size: "۲۴۰ KB",
      },
    },

    approvals: [
      {
        user: "مدیر سیستم",
        role: "حسابداری",
        action: "ثبت درخواست",
        status: "success",
        date: "۱۴۰۵/۰۶/۲۴ - ۰۹:۱۲",
        description: "درخواست ایجاد و برای بررسی اولیه ارسال شد.",
      },
      {
        user: "کارشناس بررسی",
        role: "بررسی‌کننده اولیه",
        action: "تأیید",
        status: "success",
        date: "۱۴۰۵/۰۶/۲۴ - ۱۱:۴۸",
        description: "اطلاعات درخواست بررسی و تأیید شد.",
      },
      {
        user: "مسئول پرداخت",
        role: "مسئول پرداخت",
        action: "پرداخت",
        status: "success",
        date: "۱۴۰۵/۰۶/۲۵ - ۱۰:۳۲",
        description: "مبلغ درخواست پرداخت و رسید ثبت شد.",
      },
      {
        user: "کنترل‌کننده پرداخت",
        role: "کنترل پرداخت",
        action: "در انتظار بررسی",
        status: "warning",
        date: "۱۴۰۵/۰۶/۲۵ - ۱۱:۰۵",
        description: "در انتظار تأیید نهایی پرداخت.",
      },
    ],

    activities: [
      {
        title: "رسید پرداخت بارگذاری شد",
        user: "مسئول پرداخت",
        time: "۱۴۰۵/۰۶/۲۵ - ۱۰:۳۳",
        type: "success",
      },
      {
        title: "مبلغ درخواست پرداخت شد",
        user: "مسئول پرداخت",
        time: "۱۴۰۵/۰۶/۲۵ - ۱۰:۳۲",
        type: "success",
      },
      {
        title: "درخواست تأیید شد",
        user: "کارشناس بررسی",
        time: "۱۴۰۵/۰۶/۲۴ - ۱۱:۴۸",
        type: "info",
      },
      {
        title: "درخواست ایجاد شد",
        user: "مدیر سیستم",
        time: "۱۴۰۵/۰۶/۲۴ - ۰۹:۱۲",
        type: "default",
      },
    ],
  },
};