import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { NotificationsProvider } from "@/lib/notifications-context";
import { Toaster } from "sonner";
import ClientLayout from "@/components/layout/ClientLayout";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenGeek Community",
  description: "Connect, Share, and Learn with the OpenGeek Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
          <NotificationsProvider>
            {children}
            <Toaster position="top-right" theme="dark" />
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
