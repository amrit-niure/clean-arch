import { FC } from "react";
import PageHeaderWithForm from "./page-header-with-form";
import PageHeaderWithoutForm from "./page-header-without-form";
interface PageHeaderProps {
  header: string;
  description: string;
  pagePath?: string;
  form?: "TEAM" | "APPOINTMENT";
}

const PageHeader: FC<PageHeaderProps> = ({
  description,
  header,
  form,
  pagePath,
}) => {
  if (form) {
    return (
      <PageHeaderWithForm
        description={description}
        form={form}
        header={header}
      />
    );
  } else {
    return (
      <PageHeaderWithoutForm
        description={description}
        header={header}
        pagePath={pagePath}
      />
    );
  }
};

export default PageHeader;
