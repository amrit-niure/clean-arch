"use client";
import DisplayCard from "@/app/_components/display-card";
import PageHeaderWithForm from "@/app/_components/page-header/page-header-with-form";
import { Calendar } from "lucide-react";
import { FC } from "react";

interface TeamProps {}

const Team: FC<TeamProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeaderWithForm
        description="View contact information of all the team members."
        header="Team"
        pagePath="/dashboard/team"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DisplayCard
          description="This is a description"
          icon={Calendar}
          title="Team Member"
          digit={23}
        />
        <DisplayCard
          description="This is a description"
          icon={Calendar}
          title="Team Member"
          digit={23}
        />
        <DisplayCard
          description="This is a description"
          icon={Calendar}
          title="Team Member"
          digit={23}
        />
      </div>
    </div>
  );
};

export default Team;
