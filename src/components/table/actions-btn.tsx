import { useConfirm } from "@/hooks/useConfirm";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useEffect } from "react";

interface ActionButtonsProps {
  cell: any;
  showViewButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  onView?: (cell: any) => void;
  onEdit?: (cell: any) => void;
  onDelete?: (id: string) => void;
}

export const ActionButtons = ({
  cell,
  showViewButton = true,
  showEditButton = true,
  showDeleteButton = true,
  onView,
  onEdit,
  onDelete,
}: ActionButtonsProps) => {
  const { confirm } = useConfirm();

  useEffect(() => {
    if (!onView && showViewButton) {
      console.warn("onView is not defined");
    }
    if (!onEdit) {
      console.warn("onEdit is not defined");
    }
    if (!onDelete) {
      console.warn("onDelete is not defined");
    }
  }, [onView, onEdit, onDelete, showViewButton]);

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      content: "Êtes-vous sûr de vouloir supprimer cet élément ?"
    });
    if (isConfirmed) {
      onDelete?.(id);
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {showViewButton && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => onView!(cell)}
            >
              <EyeIcon className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Voir</span>
          </TooltipContent>
        </Tooltip>
      )}
      {showEditButton && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => onEdit!(cell)}
            >
              <EditIcon className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Modifier</span>
          </TooltipContent>
        </Tooltip>
      )}
      {showDeleteButton && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => handleDelete(cell.id)}
            >
              <TrashIcon className="w-5 h-5 text-red-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Supprimer</span>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
