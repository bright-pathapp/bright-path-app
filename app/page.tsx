import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Shield,
  ArrowRight,
  UserCheck,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/navbar/navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Empower Your School to Meet Its Social-Emotional Goals
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    As a school leader, you're responsible for more than
                    academic outcomes. Today's private schools are expected to
                    nurture emotionally resilient students, foster meaningful
                    parent partnerships, and demonstrate progress on SEL
                    benchmarks.
                  </p>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    BrightPath is the all-in-one emotional check-in platform
                    designed to help your school track, understand, and respond
                    to student well-being in real-time—while strengthening
                    family engagement.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/login">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-green-600" />
                    FERPA Compliant
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    width="600"
                    height="400"
                    alt="Children learning together in a classroom environment"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section id="roles" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  For Everyone
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Supporting Every Role in a Child's Emotional Growth
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  BrightPath brings teachers, parents, and students together in
                  a connected system that helps your school strengthen emotional
                  awareness, communication, and support—every single day.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="group hover:shadow-lg transition-shadow border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-pink-100 p-3 group-hover:bg-pink-200 transition-colors">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Families</h3>
                  <p className="text-center text-gray-600">
                    Strengthen Trust & Engagement at Scale. Give families a
                    window into their child's emotional and academic
                    journey—building stronger home-school partnerships and
                    reducing communication breakdowns.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real-time emotional and behavioral updates</li>
                    <li>• Seamless two-way communication with educators</li>
                    <li>
                      • Easy access to learning milestones and support plans
                    </li>
                  </ul>
                  <p className="text-sm italic text-gray-600 mt-2">
                    "When parents feel informed, they become your strongest
                    partners in student success."
                  </p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                    <UserCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Educators</h3>
                  <p className="text-center text-gray-600">
                    Streamline Emotional Support Without Adding to Their
                    Workload. Equip teachers with intuitive tools to track
                    student emotional trends, document insights, and keep
                    families in the loop—all within minutes.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Daily mood check-ins with built-in analysis</li>
                    <li>• One-click parent updates and behavior notes</li>
                    <li>• Centralized student insights for SEL reporting</li>
                  </ul>
                  <p className="text-sm italic text-gray-600 mt-2">
                    "BrightPath gives teachers what they need to support the
                    whole child—without drowning in admin."
                  </p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
                    <GraduationCap className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Students</h3>
                  <p className="text-center text-gray-600">
                    Empower Students to Express and Understand Their Emotions.
                    Students learn to recognize, name, and share their feelings
                    in a safe, developmentally appropriate way—building the
                    foundation for long-term emotional intelligence.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Visual, age-appropriate mood tracking</li>
                    <li>• Recognition of emotional growth milestones</li>
                    <li>• Encouragement through daily engagement</li>
                  </ul>
                  <p className="text-sm italic text-gray-600 mt-2">
                    "SEL becomes second nature when students are given the right
                    tools to reflect and grow."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  For Emotional Learning & Whole-Child Support
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col lg:flex-row items-center space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  width="300"
                  height="200"
                  alt="Teacher working one-on-one with a student"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Emotional Trend Reporting
                  </h3>
                  <p className="text-gray-600">
                    Turn daily mood check-ins into actionable insights with
                    school-wide visibility into student well-being trends,
                    classroom climate, and at-risk indicators.
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-col lg:flex-row space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  width="300"
                  height="200"
                  alt="Parent and teacher meeting to discuss student progress"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Home-School Bridge</h3>
                  <p className="text-gray-600">
                    Enable seamless communication between educators and
                    parents—without extra admin—so families feel informed,
                    included, and supported in real time.
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-col lg:flex-row space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  width="300"
                  height="200"
                  alt="Diverse group of children learning together"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Family Communication</h3>
                  <p className="text-gray-600">
                    Foster stronger school-home partnerships with streamlined,
                    secure tools for updates, collaborative planning, and
                    transparency.
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-col lg:flex-row space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  width="300"
                  height="200"
                  alt="Child using a colorful emotional expression interface"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Student Voice Empowerment
                  </h3>
                  <p className="text-gray-600">
                    Give students a safe, age-appropriate way to express their
                    emotions daily—building self-awareness and helping schools
                    respond proactively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Support Every Child's Success?
                </h2>
                <p className="mx-auto max-w-[600px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the school leaders and educators already leveraging
                  BrightPath to drive impactful, student-centered learning
                  outcomes.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" variant="secondary">
                    Start Free Trial
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-purple-600"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} BrightPath. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-600"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-600"
            href="#"
          >
            FERPA Compliance
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-600"
            href="#"
          >
            Support
          </Link>
        </nav>
      </footer>
    </div>
  );
}
