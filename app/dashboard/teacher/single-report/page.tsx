import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { getReportDetails } from "@/lib/actions/moods";
import ShareReportSection from "@/components/ui/teacher/ShareReportSection";
import { PageProps } from "../students/page";

// Define mood types with their visual representations
const MOOD_TYPES = {
  HAPPY: { label: "Happy", emoji: "😊", color: "text-green-500" },
  NEUTRAL: { label: "Neutral", emoji: "😐", color: "text-gray-500" },
  SAD: { label: "Sad", emoji: "😢", color: "text-blue-500" },
  EXCITED: { label: "Excited", emoji: "🤩", color: "text-yellow-500" },
  TIRED: { label: "Tired", emoji: "😴", color: "text-purple-500" },
  ANGRY: { label: "Angry", emoji: "😠", color: "text-red-500" },
};

const MoodReportDetailsPage = async ({ searchParams }: PageProps) => {
  // Authentication check
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    redirect("/auth/login");
  }

  const params = await searchParams;
  const reportId = typeof params.id === "string" ? params.id : undefined;
  if (!reportId) {
    redirect("/dashboard/teacher");
  }
  // Fetch report details
  const reportResult = await getReportDetails(reportId);

  // Handle error case
  if (!reportResult || !reportResult.success) {
    return (
      <div className="p-8">
        <PageHeader title="Mood Report" subtitle="Error loading report" />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {"Failed to load mood report"}
        </div>
        <Link href="/dashboard/teacher/report-history">
          <Button variant="outline" className="mt-4">
            Return to Report History
          </Button>
        </Link>
      </div>
    );
  }

  const report = reportResult.data;
  const date = format(new Date(report.date), "MMMM d, yyyy");
  const reportSharings =
    "reportSharings" in report ? report.reportSharings : [];
  const sharingCount = reportSharings ? reportSharings.length : 0;
  const isShared = sharingCount > 0;

  return (
    <div className="p-6">
      <PageHeader
        title={`Mood Report: ${date}`}
        subtitle={`Class: ${report.class.name}`}
      />

      <div className="flex justify-end mb-6">
        <Link href={`/dashboard/teacher/report-history`}>
          <Button variant="outline" className="border-[#e4e4e4] text-[#727272]">
            Back to Reports
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Class Overview</h2>
          <div className="text-sm text-gray-500">
            {report.moodRecords.length} Students
          </div>
        </div>

        {/* {report.notes && (
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Teacher Notes:</h3>
            <p>{report.notes}</p>
          </div>
        )}
        
        {sharedWithParents ? (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
            This report has been shared with {report.reportSharings.length} parents.
            <p className="text-sm mt-1">
              Each parent can only see their own child's mood data.
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="font-medium mb-2">Share with Parents:</h3>
            <div className="flex items-center mb-4">
              <select
                id="sharingType"
                className="border rounded p-2 mr-4"
                defaultValue="daily"
              >
                <option value="daily">Daily Report</option>
                <option value="weekly">Weekly Compilation</option>
              </select>
              
              
              <Button className="bg-[#0089ff] hover:bg-[#0070cc] text-white">
                Share Individual Reports with Parents
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Note: Each parent will only see their own child's mood data, not the entire class report.
            </p>
          </div>
        )} */}
        <ShareReportSection
          reportId={reportId}
          isShared={isShared}
          sharingCount={sharingCount}
        />
        {/* Mood Statistics */}
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-3">Mood Distribution:</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(MOOD_TYPES).map(
              ([mood, { label, emoji, color }]) => {
                const count = report.moodRecords.filter(
                  (record) => record.mood === mood
                ).length;
                const percentage =
                  Math.round((count / report.moodRecords.length) * 100) || 0;

                return (
                  <div key={mood} className="flex items-center">
                    <span className={`text-2xl ${color}`}>{emoji}</span>
                    <div className="ml-2">
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-gray-500">
                        {count} ({percentage}%)
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Student Moods</h2>

      <div className="space-y-6">
        {report.moodRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">{record.student.name}</h3>
                {record.student.parent?.user && (
                  <div className="text-sm text-gray-500">
                    Parent: {record.student.parent.user.name}
                    {record.student.parent.user.email && (
                      <span> ({record.student.parent.user.email})</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <span className={`text-3xl ${MOOD_TYPES[record.mood].color}`}>
                  {MOOD_TYPES[record.mood].emoji}
                </span>
                <span className="ml-2 font-medium">
                  {MOOD_TYPES[record.mood].label}
                </span>
              </div>
            </div>

            <div className="mt-4">
              {record.context ? (
                <div>
                  {/* <div className="mb-2 flex justify-between items-center">
                    <h4 className="font-medium">Context/Notes:</h4>
                    
                    <Link
                      href={`/dashboard/teacher/mood-context?recordId=${record.id}`}
                      
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </div> */}
                  <p className="text-gray-700 p-2 bg-gray-50 rounded">
                    {record.context}
                  </p>
                </div>
              ) : (
                ""
                // <Link
                //   href={`/dashboard/teacher/mood-context?recordId=${record.id}`}
                //   className="text-blue-500 hover:underline"
                // >
                //   {record.mood === "SAD" || record.mood === "ANGRY" ? (
                //     <span className="text-red-500 font-medium">
                //       Add context for {record.mood.toLowerCase()} mood
                //     </span>
                //   ) : (
                //     "Add context or notes"
                //   )}
                // </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodReportDetailsPage;
