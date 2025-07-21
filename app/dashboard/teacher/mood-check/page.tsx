import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import StudentGridList from "@/components/ui/teacher/StudentGridList";
import { getStudentsForClass } from "@/lib/actions/students";
import React from "react";

interface PageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const classId =
    typeof resolvedSearchParams.classId === "string"
      ? resolvedSearchParams.classId
      : undefined;
  const studentResult = await getStudentsForClass(classId);

  return (
    <div>
      <PageHeader
        title="Choose your name 👇"
        subtitle="Select your name from grid below"
      />
      {studentResult &&
        "data" in studentResult &&
        ((studentResult.data ?? []).length > 0 ? (
          <StudentGridList
            students={studentResult.data ?? []}
            classId={classId ?? ""}
          />
        ) : (
          <div className="text-center text-gray-500 py-12">
            No students found. <br />
            <Button
              variant="default"
              className="text-white font-bold border-primary hover:bg-white p-2 h-auto cursor-pointer hover:text-primary"
            >
              Add Student
            </Button>
          </div>
        ))}
    </div>
  );
};

export default Page;
