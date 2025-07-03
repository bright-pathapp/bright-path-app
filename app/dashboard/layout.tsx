"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Bell,
  ChevronDown,
  UserPlus,
  List,
  Smile,
  Menu,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Profile from "@/components/ui/navbar/Profile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = useSession();
  const user = data?.user;
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
            <Button
              variant="ghost"
              className="w-full justify-start bg-[#0089ff] text-white hover:bg-[#0089ff]/90 rounded-lg"
            >
              <div className="w-4 h-4 mr-3 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-[#0089ff] rounded-sm"></div>
              </div>
              Dashboard
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-[#727272] hover:bg-[#f2f2f2] rounded-lg"
            >
              <UserPlus className="w-4 h-4 mr-3" />
              New Registration
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-[#727272] hover:bg-[#f2f2f2] rounded-lg"
            >
              <List className="w-4 h-4 mr-3" />
              Student List
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-[#727272] hover:bg-[#f2f2f2] rounded-lg"
            >
              <Smile className="w-4 h-4 mr-3" />
              Student Mood
            </Button>
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
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-2">
              Hello {user?.name}
              <span className="inline-block">👋</span>
            </h2>
            <p className="text-[#727272] text-base lg:text-lg">
              {"Let's learn something new today!"}
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

// export default function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   const students = [
//     { name: "Olivia Rhye", avatar: "/placeholder.svg?height=40&width=40", mood: "Happy", moodColor: "bg-[#0089ff]" },
//     { name: "Phoenix Baker", avatar: "/placeholder.svg?height=40&width=40", mood: "Sad", moodColor: "bg-[#ffc800]" },
//     { name: "Lana Steiner", avatar: "/placeholder.svg?height=40&width=40", mood: "Happy", moodColor: "bg-[#0089ff]" },
//     { name: "Demi Wilkinson", avatar: "/placeholder.svg?height=40&width=40", mood: "Happy", moodColor: "bg-[#0089ff]" },
//     { name: "Candice Wu", initials: "CW", mood: "Sad", moodColor: "bg-[#ffc800]" },
//     { name: "Natali Craig", avatar: "/placeholder.svg?height=40&width=40", mood: "Tired", moodColor: "bg-[#ffbafe]" },
//     { name: "Drew Cano", avatar: "/placeholder.svg?height=40&width=40", mood: "Mad", moodColor: "bg-[#ff4b00]" },
//     { name: "Orlando Diggs", initials: "OD", mood: "Mad", moodColor: "bg-[#ff4b00]" },
//   ]

//   return (
//     <div className="flex h-screen bg-[#f9f9f9] overflow-hidden">
//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//         fixed left-0 top-0 h-full w-48 bg-[#ffffff] border-r border-[#e4e4e4] z-50 transform transition-transform duration-300 ease-in-out
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0 lg:static lg:z-auto
//       `}
//       >
//         <div className="p-4 flex items-center justify-between">
//           <h1 className="text-lg font-bold text-[#000000] tracking-wide">BRIGHTPATH</h1>
//           <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
//             <X className="w-4 h-4" />
//           </Button>
//         </div>

//         <nav className="mt-8">
//           <div className="px-4 space-y-1">
//             <Button
//               variant="ghost"
//               className="w-full justify-start bg-[#0089ff] text-white hover:bg-[#0089ff]/90 rounded-lg"
//             >
//               <div className="w-4 h-4 mr-3 bg-white rounded-sm flex items-center justify-center">
//                 <div className="w-2 h-2 bg-[#0089ff] rounded-sm"></div>
//               </div>
//               Dashboard
//             </Button>

//             <Button variant="ghost" className="w-full justify-start text-[#727272] hover:bg-[#f2f2f2] rounded-lg">
//               <UserPlus className="w-4 h-4 mr-3" />
//               New Registration
//             </Button>

//             <Button variant="ghost" className="w-full justify-start text-[#727272] hover:bg-[#f2f2f2] rounded-lg">
//               <List className="w-4 h-4 mr-3" />
//               Student List
//             </Button>

//             <Button variant="ghost" className="w-full justify-start text-[#727272] hover:bg-[#f2f2f2] rounded-lg">
//               <Smile className="w-4 h-4 mr-3" />
//               Student Mood
//             </Button>
//           </div>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col lg:ml-0">
//         {/* Fixed Header */}
//         <header className="fixed top-0 right-0 left-0 lg:left-48 bg-[#ffffff] border-b border-[#e4e4e4] px-6 py-4 z-30">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
//                 <Menu className="w-5 h-5" />
//               </Button>

//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#727272] w-4 h-4" />
//                 <Input
//                   placeholder="Search"
//                   className="pl-10 pr-16 w-60 lg:w-80 border-[#0089ff] focus:border-[#0089ff] rounded-lg"
//                 />
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1">
//                   <kbd className="px-1.5 py-0.5 text-xs bg-[#f2f2f2] rounded text-[#727272]">⌘</kbd>
//                   <kbd className="px-1.5 py-0.5 text-xs bg-[#f2f2f2] rounded text-[#727272]">F</kbd>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Bell className="w-5 h-5 text-[#727272]" />
//               <div className="flex items-center space-x-2">
//                 <Avatar className="w-8 h-8">
//                   <AvatarImage src="/placeholder.svg?height=32&width=32" />
//                   <AvatarFallback className="bg-[#f2f2f2] text-[#727272]">T</AvatarFallback>
//                 </Avatar>
//                 <span className="text-[#000000] font-medium hidden sm:block">Teacher</span>
//                 <ChevronDown className="w-4 h-4 text-[#727272] hidden sm:block" />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Scrollable Main Content */}
//         <main className="flex-1 overflow-y-auto pt-20 pb-6 px-6">
//           <div className="mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-2">
//               Hello Dayton <span className="inline-block">👋</span>
//             </h2>
//             <p className="text-[#727272] text-base lg:text-lg">{"Let's learn something new today!"}</p>
//           </div>

//           {/* Mood Summary */}
//           <div className="bg-[#ffffff] rounded-lg p-4 lg:p-6 mb-6 border border-[#e4e4e4]">
//             <div className="flex flex-wrap items-center gap-4 lg:gap-8">
//               <span className="text-[#000000] font-medium w-full sm:w-auto">{"Today's Moods:"}</span>

//               <div className="flex items-center space-x-2">
//                 <span className="text-xl lg:text-2xl">😊</span>
//                 <span className="text-[#000000] font-medium text-sm lg:text-base">22 Happy</span>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <span className="text-xl lg:text-2xl">😔</span>
//                 <span className="text-[#000000] font-medium text-sm lg:text-base">3 Sad</span>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <span className="text-xl lg:text-2xl">😠</span>
//                 <span className="text-[#000000] font-medium text-sm lg:text-base">1 Mad</span>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <span className="text-xl lg:text-2xl">😴</span>
//                 <span className="text-[#000000] font-medium text-sm lg:text-base">4 Tired</span>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <span className="text-xl lg:text-2xl">⚡</span>
//                 <span className="text-[#000000] font-medium text-sm lg:text-base">5 Excited</span>
//               </div>
//             </div>
//           </div>

//           {/* Student List */}
//           <div className="bg-[#ffffff] rounded-lg border border-[#e4e4e4] mb-6">
//             <div className="px-4 lg:px-6 py-4 border-b border-[#e4e4e4]">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <Checkbox />
//                   <span className="text-[#727272] font-medium text-sm lg:text-base">Student Name</span>
//                 </div>
//                 <span className="text-[#727272] font-medium text-sm lg:text-base">{"Today's Mood"}</span>
//               </div>
//             </div>

//             <div className="divide-y divide-[#e4e4e4]">
//               {students.map((student, index) => (
//                 <div key={index} className="px-4 lg:px-6 py-4 flex items-center justify-between hover:bg-[#f9f9f9]">
//                   <div className="flex items-center space-x-3 lg:space-x-4">
//                     <Checkbox />
//                     <div className="flex items-center space-x-3">
//                       {student.avatar ? (
//                         <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
//                           <AvatarImage src={student.avatar || "/placeholder.svg"} />
//                           <AvatarFallback className="bg-[#f2f2f2] text-[#727272]">
//                             {student.name
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#4976f4] flex items-center justify-center text-white font-medium text-sm">
//                           {student.initials}
//                         </div>
//                       )}
//                       <span className="text-[#000000] font-medium text-sm lg:text-base">{student.name}</span>
//                     </div>
//                   </div>

//                   <Badge
//                     className={`${student.moodColor} text-white hover:${student.moodColor}/90 rounded-full px-2 lg:px-3 py-1 text-xs lg:text-sm`}
//                   >
//                     <span className="mr-1">
//                       {student.mood === "Happy" && "😊"}
//                       {student.mood === "Sad" && "😔"}
//                       {student.mood === "Mad" && "😠"}
//                       {student.mood === "Tired" && "😴"}
//                     </span>
//                     {student.mood}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//             <Button className="flex-1 bg-[#0089ff] hover:bg-[#0089ff]/90 text-white py-4 lg:py-6 text-base lg:text-lg font-medium rounded-lg">
//               Analyze & Add Content
//             </Button>
//             <Button className="flex-1 bg-[#4976f4] hover:bg-[#4976f4]/90 text-white py-4 lg:py-6 text-base lg:text-lg font-medium rounded-lg">
//               Save & Notify Parents
//             </Button>
//           </div>

//         </main>
//       </div>
//     </div>
//   )
// }
