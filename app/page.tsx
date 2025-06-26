import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Shield,
  Clock,
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
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Empowering Every Child's Unique Journey
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Comprehensive IEP management system designed for children
                    with special needs. Connect parents, teachers, and students
                    in a supportive digital environment that celebrates every
                    milestone.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
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
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-purple-600" />
                    24/7 Family Support
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    width="600"
                    height="400"
                    alt="Children with special needs learning together in an inclusive classroom"
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
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
                  For Everyone
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Supporting Every Role in Your Child's Education
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform brings together parents, teachers, and students
                  in a collaborative environment designed specifically for
                  special needs education.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="group hover:shadow-lg transition-shadow border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-pink-100 p-3 group-hover:bg-pink-200 transition-colors">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Parents</h3>
                  <p className="text-center text-gray-600">
                    Stay connected with your child's progress, communicate with
                    teachers, and access IEP goals and accommodations anytime.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real-time progress updates</li>
                    <li>• Direct teacher communication</li>
                    <li>• IEP meeting scheduling</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                    <UserCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Teachers</h3>
                  <p className="text-center text-gray-600">
                    Manage IEP goals, track student progress, collaborate with
                    families, and document accommodations effectively.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• IEP goal tracking</li>
                    <li>• Progress documentation</li>
                    <li>• Family collaboration tools</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
                    <GraduationCap className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">For Students</h3>
                  <p className="text-center text-gray-600">
                    Age-appropriate interface to view achievements, access
                    learning materials, and celebrate milestones.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Visual progress tracking</li>
                    <li>• Achievement celebrations</li>
                    <li>• Accessible learning tools</li>
                  </ul>
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
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Specialized Tools for Special Needs Education
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col lg:flex-row items-center space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  width="300"
                  height="200"
                  alt="Teacher working one-on-one with a special needs student"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">IEP Goal Management</h3>
                  <p className="text-gray-600">
                    Create, track, and update individualized education program
                    goals with detailed progress monitoring and data collection.
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
                  <h3 className="text-xl font-bold">Family Communication</h3>
                  <p className="text-gray-600">
                    Secure messaging, progress sharing, and collaborative
                    planning tools to keep families engaged and informed.
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
                  <h3 className="text-xl font-bold">Accommodation Tracking</h3>
                  <p className="text-gray-600">
                    Document and monitor accommodations and modifications to
                    ensure consistent implementation across all settings.
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-col lg:flex-row space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  width="300"
                  height="200"
                  alt="Child celebrating achievement with colorful learning materials"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Progress Celebration</h3>
                  <p className="text-gray-600">
                    Visual progress tracking and milestone celebrations that
                    motivate students and recognize every achievement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-4xl font-bold text-purple-600">5,000+</div>
                <div className="text-xl font-semibold">
                  IEP Students Supported
                </div>
                <p className="text-center text-gray-600">
                  Helping children with special needs achieve their
                  individualized goals
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-4xl font-bold text-pink-600">200+</div>
                <div className="text-xl font-semibold">
                  Special Education Programs
                </div>
                <p className="text-center text-gray-600">
                  Trusted by schools and districts specializing in inclusive
                  education
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-4xl font-bold text-blue-600">95%</div>
                <div className="text-xl font-semibold">Family Satisfaction</div>
                <p className="text-center text-gray-600">
                  Families report improved communication and student progress
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Support Every Child's Success?
                </h2>
                <p className="mx-auto max-w-[600px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join families and educators who are already using SpecialCare
                  IEP to create meaningful learning experiences.
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
          © {new Date().getFullYear()} Bright App IEP. All rights reserved.
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
