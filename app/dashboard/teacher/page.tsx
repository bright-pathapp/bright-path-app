import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import TableComponent from "@/components/ui/table/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import AddClassModal from "@/components/ui/teacher/AddClassModal";
import { getClassesForTeacher } from "@/lib/actions/classes";
const page = async () => {
  const columns = [
    { header: "Class Name", accessor: "name" },
    { header: "Teacher", accessor: "teacherName" },
    { header: "Date Created", accessor: "createdAt" },
    { header: "Description", accessor: "description" },
    { header: "No of students", accessor: "studentCount" },
    {
      header: "Action",
      accessor: "view",
      // className: "text-center"
    },
  ];

  const data = [
    {
      id: 1,
      className: "Math 101",
      teacher: "John Doe",
      date: "2023-10-01",
    },
    {
      id: 2,
      className: "Science 101",
      teacher: "Jane Smith",
      date: "2023-10-02",
    },
    {
      id: 3,
      className: "Science 101",
      teacher: "Jane Smith",
      date: "2023-10-02",
    },
  ];

  const renderRow = (item: any) => (
    <TableRow
      key={item.id}
      className="border-b  border-[#e4e4e4] hover:bg-[#f9f9f9] "
    >
      <TableCell className="text-[#000000] font-medium">{item.name}</TableCell>
      <TableCell className="text-[#727272]">{item.teacherName}</TableCell>
      <TableCell className="text-[#727272]">
        {item.createdAt.toLocaleDateString()}
      </TableCell>
      <TableCell className="text-[#727272]">{item.description}</TableCell>
      <TableCell className="text-[#727272]">{item.studentCount}</TableCell>
      <TableCell>
        <Button
          variant="default"
          className=" text-white font-bold border-primary hover:bg-white p-2 h-auto  cursor-pointer hover:text-primary"
        >
          view students
        </Button>
      </TableCell>
    </TableRow>
  );
  const classesResult = await getClassesForTeacher();
  console.log(classesResult, "classes");
  return (
    <>
      <PageHeader title="Class Room" subtitle="List of teacher's class" />
      {classesResult &&
        "data" in classesResult &&
        (classesResult.data.length > 0 ? (
          <TableComponent
            columns={columns}
            data={classesResult.data}
            renderRow={renderRow}
          />
        ) : (
          <div className="text-center text-gray-500 py-12">
            No classrooms found. <br />
            <span className="text-sm">
              Click "Add Class" to create your first classroom.
            </span>
          </div>
        ))}
      {/* Add pagination */}
      <AddClassModal />
    </>
  );
};

export default page;
