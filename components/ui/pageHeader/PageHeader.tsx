import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="">
        <h1 className="text-2xl font-semibold text-[#000000] mb-1">{title}</h1>
        <p className="text-[#727272]">{subtitle}</p>
      </div>

      <div className=" flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-[#afafaf]" />
          <span className="text-[#727272]">Filter by</span>
          <Button
            variant="ghost"
            className="text-[#0089ff] hover:text-[#4976f4] p-0 h-auto font-normal"
          >
            dates
          </Button>
          <span className="text-[#727272]">|</span>
          <Button
            variant="ghost"
            className="text-[#0089ff] hover:text-[#4976f4] p-0 h-auto font-normal"
          >
            Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
