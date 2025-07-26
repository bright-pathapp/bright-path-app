"use client";
import React from "react";

import type { User } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useMedia } from "react-use";
import Link from "next/link";
const Profile = ({ user }: { user: User }) => {
  const isMobile = useMedia("(max-width:1024px)", false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!isMobile ? (
          <div className="hidden md:flex">
            <Button variant="outline" className="cursor-pointer">
              {user?.name}
            </Button>
          </div>
        ) : (
          <div className="flex md:hidden cursor-pointer ">
            <UserIcon className="h-6 w-6 text-gray-500 ml-2" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-transparent" align="end">
        <DropdownMenuLabel>
          {user?.role}: {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/profile/change-password">
              Change password
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
