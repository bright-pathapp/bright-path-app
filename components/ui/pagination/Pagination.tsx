"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-[#727272]">Show</span>
        <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
          <SelectTrigger className="w-16 h-8 border-[#e4e4e4]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-[#727272]">Row</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#727272] hover:text-[#000000]"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {[1, 2, 3, 4, 5].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="icon"
            className={`h-8 w-8 ${
              currentPage === page
                ? "bg-[#0089ff] text-[#ffffff] hover:bg-[#4976f4]"
                : "text-[#727272] hover:text-[#000000]"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <span className="text-[#727272] px-2">...</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#727272] hover:text-[#000000]"
        >
          10
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#727272] hover:text-[#000000]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
