import { ActionButtons } from "@/components/table/actions-btn";
import { SortBtn } from "@/components/table/sort.btn";
import { Profile } from "@/models/profile.model";
import { ColumnDef } from "@tanstack/react-table";
import api from "@/lib/api/profiles.api";

export const AdminColumns: ColumnDef<Profile>[] = [
  {
    id: "Email",
    accessorKey: "email",
    header: ({ column }) => <SortBtn column={column} />,
  },
  {
    id: "Créé le",
    accessorKey: "createdAt",
    header: ({ column }) => <SortBtn column={column} />,
    cell: ({ cell }) => {
      return new Date(cell.getValue() as string).toLocaleString();
    },
  },
  {
    id: "Actions",
    accessorKey: "id",
    header: "Actions",
    cell: ({ cell }) => (
      <ActionButtons
        cell={cell}
        showViewButton={false}
        onDelete={() => api.deleteProfile(cell.id)}
      />
    ),
  },
];
