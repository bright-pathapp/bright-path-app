"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="h-screen bg-gray-50 relative overflow-hidden flex flex-col">
      {/* Blue diagonal background */}
      <div className="absolute inset-0">
        {/* Main blue section */}
        <div className="absolute inset-0 bg-primary">
          {/* Diagonal cut creating the slanted design */}
          <div
            className="absolute inset-0 bg-gray-50"
            style={{
              clipPath: "polygon(0 60%, 100% 40%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 flex-shrink-0">
        <Link href={"/"} className="text-white text-xl font-bold tracking-wide">
          BRIGHTPATH
        </Link>

        <Button
          asChild
          //   variant="outline"
          className="  text-white  hover:bg-white hover:text-primary px-6 py-2"
        >
          <Link
            href={pathname === "/auth/login" ? "/auth/signup" : "/auth/login"}
          >
            {pathname === "/auth/login"
              ? "SIGN UP"
              : pathname === "/auth/signup"
              ? "SIGN IN"
              : ""}
          </Link>
        </Button>
      </header>

      {children}
      {/* Footer */}
      <footer className="relative z-10 text-center py-4 flex-shrink-0">
        <p className="text-black text-sm opacity-80">
          © 2025 All Rights Reserved. Brightpath
        </p>
      </footer>
    </div>
  );
}
