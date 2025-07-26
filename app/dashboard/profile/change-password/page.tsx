"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useGenericSubmitHandler } from "@/hooks/useGenericSubmitHandler";
import { updateUserPassword } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
const page = () => {
  const { data } = useSession();
  const user = data?.user;
  const [showoldPassword, setShowoldPassword] = useState(false);
  const [oldpassword, setoldPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [shownewPassword, setShownewPassword] = useState(false);

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const res = await updateUserPassword({
      newPassword: data.newpassword,
      confirmPassword: data.oldpassword,
      userEmail: user?.email ?? "",
    });

    if (res?.status === false) {
      return toast.error(res?.message);
    }

    if (res?.status === true) {
      toast.success("password updated successfully");
    }
  });

  return (
    <div className="relative z-10 flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Change Your password
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-600 uppercase tracking-wide"
            >
              OLD PASSWORD
            </Label>
            <div className="relative">
              <Input
                name="oldpassword"
                id="oldpassword"
                type={showoldPassword ? "text" : "password"}
                value={oldpassword}
                onChange={(e) => setoldPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowoldPassword(!showoldPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showoldPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-600 uppercase tracking-wide"
            >
              CONFIRM PASSWORD
            </Label>
            <div className="relative">
              <Input
                name="newpassword"
                id="newpassword"
                type={shownewPassword ? "text" : "password"}
                value={newpassword}
                onChange={(e) => setnewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShownewPassword(!shownewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {shownewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Proceed Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-none font-medium tracking-wide"
          >
            {loading ? "loading..." : "Change password"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default page;
