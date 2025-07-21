"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { shareReportWithParents } from "@/lib/actions/moods";

export default function ShareReportSection({
  reportId,
  isShared = false,
  sharingCount = 0,
}: {
  reportId: string;
  isShared?: boolean;
  sharingCount?: number;
}) {
  const [sharingType, setSharingType] = useState("daily");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleShareReport = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    // try {
    //   const result = await shareReportWithParents(reportId, sharingType);

    //   if (result.success) {
    //     setSuccess(`Report shared with ${result.data.length} parents`);
    //     // Force reload to show updated UI
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 1500);
    //   } else {
    //     setError(result.error || "Failed to share report");
    //   }
    // } catch (err) {
    //   setError("An unexpected error occurred");
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  if (isShared) {
    return (
      <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
        This report has been shared with {sharingCount} parents.
        <p className="text-sm mt-1">
          Each parent can only see their own child's mood data.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Share with Parents:</h3>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center mb-4">
        <select
          value={sharingType}
          onChange={(e) => setSharingType(e.target.value)}
          className="border rounded p-2 mr-4"
          disabled={isLoading}
        >
          <option value="daily">Daily Report</option>
          <option value="weekly">Weekly Compilation</option>
        </select>

        <Button
          onClick={handleShareReport}
          disabled={isLoading}
          className="bg-[#0089ff] hover:bg-[#0070cc] text-white"
        >
          {isLoading ? "Sharing..." : "Share Individual Reports with Parents"}
        </Button>
      </div>

      <p className="text-sm text-gray-600">
        Note: Each parent will only see their own child's mood data, not the
        entire class report.
      </p>
    </div>
  );
}
