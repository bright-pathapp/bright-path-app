"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useGenericSubmitHandler } from "@/hooks/useGenericSubmitHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/auth";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("johndoe@example.com");
  const [name, setName] = useState("john");
  const [password, setPassword] = useState("••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();
  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const res = await createUser(
      data.name,
      data.email,
      data.password,
      "TEACHER"
    );

    if (res?.status === false) {
      return toast.error(res?.message);
    }

    if (res?.status === true) {
      toast.success("Account created successfully");
      router.push("/auth/login");
    }
  });
  return (
    <div className="relative z-10 flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign up to BrightPath
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* first name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-600 uppercase tracking-wide"
            >
              FIRST NAME
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-600 uppercase tracking-wide"
            >
              EMAIL ADDRESS
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-600 uppercase tracking-wide"
            >
              PASSWORD
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
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
            {loading ? "CREATING ACCOUNT..." : " CREATE ACCOUNT"}
          </Button>
        </form>
      </div>
    </div>
  );
}
