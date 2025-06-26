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

const Profile = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {user?.name}
        </Button>
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

        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
