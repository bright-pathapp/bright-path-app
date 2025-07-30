import ParentDashboard from "@/components/ui/parent/ParentDashboard";
import { getSharedReportsForParent } from "@/lib/actions/moods";
import React from "react";

const page = async () => {
  // const result = await getSharedReportsForParent();
  // console.log(result);
  return <ParentDashboard />;
};

export default page;
