import type { Metadata } from "next";
import "./globals.css";
import { ConfigProvider } from 'antd';



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ConfigProvider direction="rtl">
        {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
 