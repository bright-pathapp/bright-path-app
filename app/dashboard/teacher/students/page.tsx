import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import TableComponent from "@/components/ui/table/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import AddStudentModal from "@/components/ui/teacher/AddStudentModal";
import { getClassesForTeacher } from "@/lib/actions/classes";
import { getStudentsForClass } from "@/lib/actions/students";

// Next.js 15 uses Promises for params and searchParams
export interface PageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  // Await the searchParams Promise
  const resolvedSearchParams = await searchParams;
  const classId =
    typeof resolvedSearchParams.classId === "string"
      ? resolvedSearchParams.classId
      : undefined;

  const columns = [
    { header: "Student Name", accessor: "name" },
    { header: "Class", accessor: "class" },
    { header: "Date of birth", accessor: "dateOfBirth" },
    { header: "Parent", accessor: "parent" },
    {
      header: "Action",
      accessor: "view",
    },
  ];

  const renderRow = (item: any) => {
    const dateString = item.dateOfBirth
      ? new Date(item.dateOfBirth).toLocaleDateString()
      : "Not specified";

    return (
      <TableRow
        key={item.id}
        className="border-b border-[#e4e4e4] hover:bg-[#f9f9f9]"
      >
        <TableCell className="text-[#000000] font-medium">
          {item.name}
        </TableCell>
        <TableCell className="text-[#727272]">{item.className}</TableCell>
        <TableCell className="text-[#727272]">{dateString}</TableCell>
        <TableCell className="text-[#727272]">{item.parentEmail}</TableCell>
        <TableCell>
          <Button
            variant="default"
            className="text-white font-bold border-primary hover:bg-white p-2 h-auto cursor-pointer hover:text-primary"
          >
            view student
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const classesResult = await getClassesForTeacher();
  const studentResult = await getStudentsForClass(classId);

  return (
    <>
      <PageHeader
        title="Add Students to your class"
        subtitle="Add Student's manually"
      />
      {studentResult &&
        "data" in studentResult &&
        ((studentResult.data ?? []).length > 0 ? (
          <TableComponent
            columns={columns}
            data={studentResult.data ?? []}
            renderRow={renderRow}
          />
        ) : (
          <div className="text-center text-gray-500 py-12">
            No students found. <br />
            <span className="text-sm">
              Click "Add Student" to create a student.
            </span>
          </div>
        ))}
      <AddStudentModal
        classes={
          classesResult && "data" in classesResult ? classesResult.data : []
        }
      />
    </>
  );
}
