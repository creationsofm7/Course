import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { ThemeProvider } from "@/lib/context/ThemeProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CourseGenie",
  description: "The Ultimate Learning Tool",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  
  // Get the user's theme preference from session
  const initialTheme = session?.user?.DarkMode ? "dark" : "light";
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-[linear-gradient(rgba(200,200,200,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,.2)_1px,transparent_1px)] bg-[size:50px_50px] [animation:grid-bg_20s_linear_infinite] dark:bg-[linear-gradient(rgba(55,55,55,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(55,55,55,.2)_1px,transparent_1px)]`}
      >
        <ThemeProvider initialTheme={initialTheme}>
          {/* <Navbar /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}