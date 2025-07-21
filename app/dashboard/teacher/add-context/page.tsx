import React from "react";
import { getStudentsForClass } from "@/lib/actions/students";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StudentContextEditor from "@/components/ui/teacher/StudentContextEditor";
import { PageProps } from "../students/page";

export default async function AddContextPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const classId =
    typeof params.classId === "string" ? params.classId : undefined;

  // Authentication check
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    redirect("/auth/signin");
  }

  if (!classId) {
    redirect("/dashboard/teacher");
  }

  // Fetch students with their mood records
  const studentsResult = await getStudentsForClass(classId);

  if (!studentsResult.status) {
    // Handle error
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="mt-2">{"Failed to load students"}</p>
        <a
          href="/dashboard/teacher"
          className="text-blue-500 mt-4 inline-block"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  if (!("data" in studentsResult)) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="mt-2">Invalid response format from server</p>
        <a
          href="/dashboard/teacher"
          className="text-blue-500 mt-4 inline-block"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }
  // Filter only students with SAD or ANGRY moods
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  const sadAngryStudents = (studentsResult?.data ?? []).filter((student) => {
    const hasMoodRecord =
      "moodRecords" in student && student.moodRecords.length > 0;

    return (
      hasMoodRecord &&
      (student.moodRecords[0].mood === "SAD" ||
        student.moodRecords[0].mood === "ANGRY")
    );
  });

  // Pass filtered data to client component
  return <StudentContextEditor students={sadAngryStudents} classId={classId} />;
}
