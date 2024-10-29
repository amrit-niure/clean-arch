import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/app/_components/ui/toaster";
import "./globals.css";
import { getSessionForLayout } from "./_lib/check-auth";
import { SessionProvider } from "./_components/providers/session-provider";
import { ThemeProvider } from "./_components/providers/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "CRM",
  description: "Customer Relationship Managment software",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = await getSessionForLayout();
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable}  antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider value={sessionData}>
            {/* <Providers> */}
            {children}
            <Toaster />
            {/* </Providers> */}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
