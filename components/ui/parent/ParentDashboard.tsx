"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { getSharedReportsForParent } from "@/lib/actions/moods";

// Define mood types with their visual representations
const MOOD_TYPES = {
  HAPPY: { label: "Happy", emoji: "😊", color: "text-green-500" },
  NEUTRAL: { label: "Neutral", emoji: "😐", color: "text-gray-500" },
  SAD: { label: "Sad", emoji: "😢", color: "text-blue-500" },
  EXCITED: { label: "Excited", emoji: "🤩", color: "text-yellow-500" },
  TIRED: { label: "Tired", emoji: "😴", color: "text-purple-500" },
  ANGRY: { label: "Angry", emoji: "😠", color: "text-red-500" },
};

const ParentDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sharedReports, setSharedReports] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch shared reports for this parent using server action
    const fetchSharedReports = async () => {
      try {
        const result = await getSharedReportsForParent();

        if (result.success) {
          setSharedReports(result.data);
        } else {
          console.error("Failed to fetch shared reports:", result.error);
        }
      } catch (error) {
        console.error("Error fetching shared reports:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchSharedReports();
    }
  }, [session]);
  // Show loading state while checking authentication
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Parent Dashboard"
        subtitle={`Welcome, ${session?.user.name}`}
      />

      <div className="grid gap-6 mt-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Shared Mood Reports</h2>

          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : sharedReports.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500 py-8">
                  <p>No mood reports have been shared with you yet.</p>
                  <p className="text-sm mt-2">
                    Check back later for updates from your child's teacher.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sharedReports.map((report: any) => (
                <Card key={report.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-3">
                    <CardTitle>
                      {format(new Date(report.moodReport.date), "MMMM d, yyyy")}
                    </CardTitle>
                    <CardDescription>
                      {report.moodReport.class.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {report.moodReport.moodRecords.map(
                      (record: {
                        id: string;
                        student: { name: string };
                        mood: keyof typeof MOOD_TYPES;
                        context?: string;
                      }) => (
                        <div key={record.id} className="mb-3 last:mb-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">
                                {record.student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {MOOD_TYPES[record.mood].label}
                              </div>
                            </div>
                            <span
                              className={`text-2xl ${
                                MOOD_TYPES[record.mood].color
                              }`}
                            >
                              {MOOD_TYPES[record.mood].emoji}
                            </span>
                          </div>
                          {record.context && (
                            <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                              {record.context}
                            </div>
                          )}
                        </div>
                      )
                    )}

                    {/* <Link href={`/dashboard/parent/report/${report.report.id}`}>
                      <Button variant="outline" className="w-full mt-4">
                        View Full Report
                      </Button>
                    </Link> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ParentDashboard;
