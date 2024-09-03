import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const SortBtn = ({ column }: { column: any }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        column.toggleSorting(column.getIsSorted() === "asc");
      }}
    >
      {column.id}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
