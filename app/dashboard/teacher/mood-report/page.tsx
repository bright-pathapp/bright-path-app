import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import TableComponent from "@/components/ui/table/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { getMoodReports } from "@/lib/actions/moods";
// import { getAllMoodReports, getMoodReports } from "@/lib/actions/moods";

const MoodReportsPage = async ({
  searchParams,
}: {
  searchParams: { id?: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    redirect("/auth/signin");
  }

  const params = await searchParams;
  const classId = params.id;

  if (!classId) {
    redirect("/dashboard/teacher");
  }

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Class", accessor: "className" },
    { header: "Students", accessor: "studentCount" },
    { header: "Shared with Parents", accessor: "sharedCount" },
    {
      header: "Actions",
      accessor: "actions",
    },
  ];

  // Function to render each row
  const renderRow = (report: any) => (
    <TableRow
      key={report.id}
      className="border-b border-[#e4e4e4] hover:bg-[#f9f9f9]"
    >
      <TableCell className="text-[#000000] font-medium">
        {format(new Date(report.date), "MMMM d, yyyy")}
      </TableCell>
      <TableCell className="text-[#727272]">{report.className}</TableCell>
      <TableCell className="text-[#727272]">
        {report._count.moodRecords} students
      </TableCell>
      <TableCell className="text-[#727272]">
        {report._count.reportSharings > 0 ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Shared with {report._count.reportSharings} parents
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Not shared
          </span>
        )}
      </TableCell>
      <TableCell className="flex items-center space-x-2">
        <Button
          variant="default"
          className="text-white font-bold border-primary hover:bg-white p-2 h-auto cursor-pointer hover:text-primary"
        >
          <Link href={`/dashboard/teacher/single-report?id=${report.id}`}>
            View Report
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );

  const reportsResult = await getMoodReports(classId);
  console.log(reportsResult, "reportsResult");
  // Error handling
  if (!reportsResult || !reportsResult.success) {
    return (
      <div className="p-8">
        <PageHeader title="Mood Reports" subtitle="Error loading reports" />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {reportsResult?.error || "Failed to load mood reports"}
        </div>
        <Link href="/dashboard/teacher">
          <Button variant="outline" className="mt-4">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  // Format data for the table
  const formattedReports = reportsResult.data.map((report: any) => ({
    ...report,
    className: report.class?.name || "Unknown Class",
  }));
  console.log(formattedReports, "formattedReports");
  return (
    <>
      <div className="p-6">
        <PageHeader title="Mood Reports" subtitle={"Educator's report"} />

        <div className="flex justify-end mb-6">
          {classId && (
            <Link href={`/dashboard/teacher/mood-check?classId=${classId}`}>
              <Button
                variant="default"
                className="mr-2 bg-[#0089ff] hover:bg-[#0070cc] text-white"
              >
                Record Today's Moods
              </Button>
            </Link>
          )}
          <Link href="/dashboard/teacher">
            <Button
              variant="outline"
              className="border-[#e4e4e4] text-[#727272]"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {formattedReports.length > 0 ? (
          <TableComponent
            columns={columns}
            data={formattedReports}
            renderRow={renderRow}
          />
        ) : (
          <div className="text-center bg-gray-50 p-8 rounded-lg border border-gray-200">
            <p className="text-lg text-gray-600 mb-4">No mood reports found</p>
            {classId && (
              <Link href={`/dashboard/teacher/mood-check?classId=${classId}`}>
                <Button className="bg-[#0089ff] hover:bg-[#0070cc] text-white">
                  Create your first mood report
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MoodReportsPage;
