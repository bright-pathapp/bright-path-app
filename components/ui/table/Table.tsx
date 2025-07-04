import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps {
  columns: {
    header: string;
    accessor: string;
    className?: string;
  }[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
}
const TableComponent = ({ columns, renderRow, data }: TableProps) => {
  return (
    <div
      className="
    
    "
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#e4e4e4]">
            {columns.map((column) => (
              <TableHead
                key={column.accessor}
                className={`text-[#727272] font-medium ${
                  column.className || ""
                }`}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y-2">
          {data.map((item) => renderRow(item))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
