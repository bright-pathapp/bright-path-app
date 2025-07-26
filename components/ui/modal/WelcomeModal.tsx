"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Component({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const handleChangePassword = () => {
    // Handle password change navigation
    router.push("/dashboard/profile/change-password");
    console.log("Redirecting to password change...");
    setOpen(false);
  };

  const handleLater = () => {
    // Handle "remind me later" action
    console.log("Remind me later...");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Welcome! Please Update Your Password
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            To keep your account secure, we recommend changing your password
            regularly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              For your security, please create a strong, unique password that
              you haven't used before.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Lock className="h-4 w-4 text-green-600" />
              <span>Use at least 8 characters</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Lock className="h-4 w-4 text-green-600" />
              <span>Include uppercase and lowercase letters</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Lock className="h-4 w-4 text-green-600" />
              <span>Add numbers and special characters</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={handleChangePassword} className="w-full">
            Change Password Now
          </Button>
          <Button
            variant="ghost"
            onClick={handleLater}
            className="w-full text-muted-foreground"
          >
            Remind Me Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
