import "./globals.css";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import BasicLayout from "@/layouts/BasicLayout";
import React from "react";

// 全局页面入口
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
      <AntdRegistry>
          <BasicLayout>
              {children}
          </BasicLayout>
      </AntdRegistry>
      </body>
    </html>
  );
}
