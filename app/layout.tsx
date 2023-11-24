import { ThemeProvider } from "@/components/theme-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = (
    <>
      <Link href="/">Cams</Link>
      <Link href="/">Cams</Link>
    </>
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col gap-4 items-center",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-40 w-full bg-background shadow border-b px-4">
            <div className="flex h-16 items-center max-w-8xl space-x-4 sm:justify-between sm:space-x-0 mx-auto px-4">
              <div className="flex gap-6 md:gap-10">
                <Link
                  href="/"
                  className="hidden md:flex items-center space-x-2"
                >
                  <span className="font-bold inline-block">{"NextCams"}</span>
                </Link>
                <>
                  <nav className="hidden gap-6 md:flex">{links}</nav>
                  <div className="flex md:hidden items-center">
                    <Sheet>
                      <SheetTrigger>
                        <PanelLeft className="w-6 h-6" />
                      </SheetTrigger>
                      <SheetContent
                        side={"left"}
                        className="flex flex-col gap-2"
                      >
                        <SheetHeader>
                          <SheetTitle>
                            <Link
                              href="/"
                              className="flex items-center space-x-2"
                            >
                              <span className="font-bold inline-block">
                                NextCams
                              </span>
                            </Link>
                          </SheetTitle>
                        </SheetHeader>
                        {links}
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              </div>

              <div className="flex flex-1 items-center space-x-4 justify-end">
                <nav className="flex space-x-4">User</nav>
              </div>
            </div>
          </header>
          <div className="max-w-7xl w-full">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
