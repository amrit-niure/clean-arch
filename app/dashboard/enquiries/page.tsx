import PageHeader from "@/app/_components/page-header/page-header";
import { FC } from "react";

interface EnquiriesProps {}

const Enquiries: FC<EnquiriesProps> = ({}) => {
  return (
    <div>
      {" "}
      <PageHeader
        description="Follow up the enquiries form all over the world."
        header="Enquiries"
      />{" "}
    </div>
  );
};

export default Enquiries;
