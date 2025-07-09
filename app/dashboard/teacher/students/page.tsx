import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import TableComponent from "@/components/ui/table/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import AddStudentModal from "@/components/ui/teacher/AddStudentModal";
import { getClassesForTeacher } from "@/lib/actions/classes";
import { getStudentsForClass } from "@/lib/actions/students";
const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { classId, ...queryParams } = searchParams;

  const columns = [
    { header: "Student Name", accessor: "name" },
    { header: "Class", accessor: "class" },
    { header: "Date of birth", accessor: "dateOfBirth" },
    { header: "Parent", accessor: "parent" },
    {
      header: "Action",
      accessor: "view",
      // className: "text-center"
    },
  ];

  const renderRow = (item: any) => (
    <TableRow
      key={item.id}
      className="border-b  border-[#e4e4e4] hover:bg-[#f9f9f9] "
    >
      <TableCell className="text-[#000000] font-medium">{item.name}</TableCell>
      <TableCell className="text-[#727272]">{item.className}</TableCell>
      <TableCell className="text-[#727272]">
        {item.dateOfBirth.toLocaleDateString()}
      </TableCell>
      <TableCell className="text-[#727272]">{item.parentEmail}</TableCell>

      <TableCell>
        <Button
          variant="default"
          className=" text-white font-bold border-primary hover:bg-white p-2 h-auto  cursor-pointer hover:text-primary"
        >
          view student
        </Button>
      </TableCell>
    </TableRow>
  );
  const classesResult = await getClassesForTeacher();
  const studentResult = await getStudentsForClass(classId);
  console.log(studentResult, "students");
  return (
    <>
      <PageHeader
        title="Add Students to your class"
        subtitle="Add Student's manually"
      />
      {studentResult &&
        "data" in studentResult &&
        (studentResult.data.length > 0 ? (
          <TableComponent
            columns={columns}
            data={studentResult.data}
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
      {/* Add pagination */}
      <AddStudentModal
        classes={classesResult && "data" in classesResult && classesResult.data}
      />
    </>
  );
};

export default page;
