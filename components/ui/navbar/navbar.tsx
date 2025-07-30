"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Profile from "./Profile";

const Navbar = () => {
  const { data } = useSession();
  const user = data?.user;
  // console.log(user, "user");
  // console.log(data, "data");
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-transparent bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <Link className="flex items-center justify-center" href="/">
        {/* <Heart className="h-8 w-8 text-blue-600" /> */}
        <span className="ml-2 text-2xl font-bold text-blue-600">
          BrightPath
        </span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <div className="hidden md:flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#roles"
          >
            For Everyone
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#about"
          >
            About
          </Link>
        </div>

        {user ? (
          <Profile user={user} />
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
