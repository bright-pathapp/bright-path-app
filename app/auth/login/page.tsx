"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setLoading(false);
        return toast.error(result?.error);
      }

      // Redirect based on user role
      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );

      if (session?.user?.role === "TEACHER") {
        router.push("/dashboard/teacher");
      } else if (session?.user?.role === "PARENT") {
        router.push("/dashboard/parent");
      } else {
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      return toast.error("An error occurred during login");
    }
  };
  return (
    <div className="relative z-10 flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Log In to BrightPath
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember Me
              </Label>
            </div>
            <Link href="#" className="text-sm text-gray-600 hover:text-primary">
              Forgot Password?
            </Link>
          </div>

          {/* Proceed Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-none font-medium tracking-wide"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
