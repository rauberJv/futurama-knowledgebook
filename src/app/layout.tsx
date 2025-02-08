import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AppProvider } from "@/contexts/AppProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
      <body className={`${roboto.className} antialiased`}>
        <header className="flex flex-row items-center justify-center p-4">
          <nav className="flex flex-row items-center justify-center">
            <Link href="/">Home</Link>
          </nav>
        </header>
        <AppProvider>
          <main className="max-w-7xl min-h-screen p-4 mx-auto">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
