"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, List, Smile, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Profile from "@/components/ui/navbar/Profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Role } from "../generated/prisma";
import Component from "@/components/ui/modal/WelcomeModal";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { data } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  console.log(user);
  useEffect(() => {
    if (user?.isFirstLogin && user.role === Role.PARENT) {
      setShowPasswordModal(true);
    }
  }, [user]);
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed left-0 top-0 h-full w-48 bg-[#f9f9f9] border-r border-[#e4e4e4] z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#000000] tracking-wide">
            BRIGHTPATH
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-1">
            {user?.role === Role.TEACHER && (
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-lg ${
                  pathname === "/dashboard/teacher"
                    ? "bg-[#0089ff] text-white hover:bg-[#0089ff]/90"
                    : "text-[#727272] hover:bg-[#f2f2f2]"
                }`}
              >
                <Link
                  className="w-full justify-start items-center flex"
                  href="/dashboard/teacher"
                >
                  {pathname === "/dashboard/teacher" ? (
                    <div className="w-4 h-4 mr-3 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#0089ff] rounded-sm"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 mr-3 bg-[#e4e4e4] rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#727272] rounded-sm"></div>
                    </div>
                  )}
                  Dashboard
                </Link>
              </Button>
            )}
            {user?.role === Role.PARENT && (
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-lg ${
                  pathname === "/dashboard/teacher"
                    ? "bg-[#0089ff] text-white hover:bg-[#0089ff]/90"
                    : "text-[#727272] hover:bg-[#f2f2f2]"
                }`}
              >
                <Link
                  className="w-full justify-start items-center flex"
                  href="/dashboard/parent"
                >
                  {pathname === "/dashboard/teacher" ? (
                    <div className="w-4 h-4 mr-3 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#0089ff] rounded-sm"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 mr-3 bg-[#e4e4e4] rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#727272] rounded-sm"></div>
                    </div>
                  )}
                  Dashboard
                </Link>
              </Button>
            )}

            {user?.role === Role.TEACHER && (
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-lg ${
                  pathname === "/dashboard/teacher/students"
                    ? "bg-[#0089ff] text-white hover:bg-[#0089ff]/90"
                    : "text-[#727272] hover:bg-[#f2f2f2]"
                }`}
              >
                <Link
                  className="w-full justify-start items-center flex"
                  href="/dashboard/teacher/students"
                >
                  <List
                    className={`w-4 h-4 mr-3 ${
                      pathname === "/dashboard/teacher/students"
                        ? "text-white"
                        : "text-[#727272]"
                    }`}
                  />
                  Student List
                </Link>
              </Button>
            )}
            {user?.role === Role.TEACHER && (
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-lg ${
                  pathname === "/dashboard/teacher/moods"
                    ? "bg-[#0089ff] text-white hover:bg-[#0089ff]/90"
                    : "text-[#727272] hover:bg-[#f2f2f2]"
                }`}
              >
                <Link
                  className="w-full justify-start items-center flex"
                  href="/dashboard/teacher/report-history"
                >
                  <Smile
                    className={`w-4 h-4 mr-3 ${
                      pathname === "/dashboard/teacher/report-history"
                        ? "text-white"
                        : "text-[#727272]"
                    }`}
                  />
                  Report History
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-48 bg-[#ffffff] border-b border-[#e4e4e4] px-6 py-4 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#727272] w-4 h-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 pr-16 w-60 lg:w-80 border-[#0089ff] focus:border-[#0089ff] rounded-lg"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 text-xs bg-[#f2f2f2] rounded text-[#727272]">
                    ⌘
                  </kbd>
                  <kbd className="px-1.5 py-0.5 text-xs bg-[#f2f2f2] rounded text-[#727272]">
                    F
                  </kbd>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-[#727272]" />
              {user && <Profile user={user} />}
              {/* <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-[#f2f2f2] text-[#727272]">T</AvatarFallback>
                </Avatar>
                <span className="text-[#000000] font-medium hidden sm:block">Teacher</span>
                <ChevronDown className="w-4 h-4 text-[#727272] hidden sm:block" />
              </div> */}
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto pt-20 pb-6 px-6">
          {pathname === "/dashboard/teacher" && (
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-2">
                Hello {user?.name}
                <span className="inline-block">👋</span>
              </h2>
              <p className="text-[#727272] text-base lg:text-lg">
                {"Let's learn something new today!"}
              </p>
            </div>
          )}

          {children}
          <Component open={showPasswordModal} setOpen={setShowPasswordModal} />
        </main>
      </div>
    </div>
  );
}
