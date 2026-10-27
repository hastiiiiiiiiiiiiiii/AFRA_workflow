import "./globals.css";

export const metadata = {
  title: "سامانه داخلی افرا",
  description: "سامانه مدیریت درخواست‌ها و فرآیندهای داخلی هلدینگ افرا",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
