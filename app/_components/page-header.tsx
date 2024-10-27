import { FC } from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { RefreshCwIcon } from "lucide-react";

interface PageHeaderProps {
  header: string;
  description: string;
  pagePath: string;
}

const PageHeader: FC<PageHeaderProps> = ({ description, header }) => {
  return (
    <CardHeader className="space-y-4 bg-gradient-to-r from-primary/5 to-muted-foreground/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold tracking-tight">
            {header}
          </CardTitle>
          <CardDescription className="text-xs max-w-2xl">
            {description}
          </CardDescription>
        </div>
        <Button
          className="self-start sm:self-auto transition-colors hover:bg-primary/90"
          onClick={() => {
            // Add your refresh logic here
            console.log("Refreshing...");
          }}
        >
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </CardHeader>
  );
};

export default PageHeader;
