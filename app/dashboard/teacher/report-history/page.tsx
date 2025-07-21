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
import { getAllMoodReports } from "@/lib/actions/moods";

const ReportHistoryPage = async () => {
  // Authentication check
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    redirect("/auth/signin");
  }

  // Define table columns
  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Class", accessor: "className" },
    { header: "Students", accessor: "studentCount" },
    { header: "Shared", accessor: "sharedStatus" },
    { header: "Actions", accessor: "actions" },
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
            Shared ({report._count.reportSharings})
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Not shared
          </span>
        )}
      </TableCell>
      <TableCell>
        <Link href={`/dashboard/teacher/single-report?id=${report.id}`}>
          <Button className="bg-[#0089ff] hover:bg-[#0070cc] text-white text-xs py-1 px-3 h-auto">
            View Report
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );

  // Fetch all reports for the teacher
  const reportsResult = await getAllMoodReports();

  // Error handling
  if (!reportsResult || !reportsResult.success) {
    return (
      <div className="p-8">
        <PageHeader
          title="Report History"
          subtitle="Error loading your report history"
        />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {"Failed to load mood reports"}
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
  const formattedReports = (reportsResult.data ?? []).map((report: any) => ({
    ...report,
    className: report.class?.name || "Unknown Class",
  }));

  // Group reports by month for better organization
  const groupedReports: Record<string, typeof formattedReports> = {};
  formattedReports.forEach((report) => {
    const month = format(new Date(report.date), "MMMM yyyy");
    if (!groupedReports[month]) {
      groupedReports[month] = [];
    }
    groupedReports[month].push(report);
  });

  return (
    <div className="p-6">
      <PageHeader
        title="Report History"
        subtitle={`${formattedReports.length} total reports across ${
          Object.keys(groupedReports).length
        } months`}
      />

      <div className="flex justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">
            View and manage all your past mood reports across all classes
          </p>
        </div>
        <Link href="/dashboard/teacher">
          <Button variant="outline" className="border-[#e4e4e4] text-[#727272]">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {formattedReports.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedReports).map(([month, reports]) => (
            <div
              key={month}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">{month}</h3>
              </div>
              <TableComponent
                columns={columns}
                data={reports}
                renderRow={renderRow}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-50 p-8 rounded-lg border border-gray-200">
          <p className="text-lg text-gray-600 mb-4">
            You haven't created any mood reports yet
          </p>
          <Link href="/dashboard/teacher">
            <Button className="bg-[#0089ff] hover:bg-[#0070cc] text-white">
              Go to Classes
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReportHistoryPage;
