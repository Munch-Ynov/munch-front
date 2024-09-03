import { ActionButtons } from "@/components/table/actions-btn";
import { SortBtn } from "@/components/table/sort.btn";
import { Profile } from "@/models/profile.model";
import { ColumnDef } from "@tanstack/react-table";
import api from "@/lib/api/profiles.api";

export const UsersColumns: ColumnDef<Profile>[] = [
  {
    id: "Avatar",
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ cell }) => {
      return (
        <img
          src={cell.getValue() as string}
          alt="avatar"
          className="rounded-md mx-auto opacity-0 transition-opacity duration-300"
          width={60}
          onLoad={(e) => {
            e.currentTarget.classList.remove("opacity-0");
          }}
        />
      );
    },
  },
  {
    id: "Nom",
    accessorKey: "name",
    header: ({ column }) => <SortBtn column={column} />,
  },
  {
    id: "Téléphone",
    accessorKey: "phone",
    header: ({ column }) => <SortBtn column={column} />,
  },
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
