"use client";

import PageHeader from "@/app/_components/page-header";
import { FC } from "react";

interface TeamProps {}

const Team: FC<TeamProps> = ({}) => {
  return (
    <div className="">
      {" "}
      <PageHeader
        description="View contact information of all the team members."
        header="Team"
        pagePath="/dashboard/team"
      />{" "}
    </div>
  );
};

export default Team;
