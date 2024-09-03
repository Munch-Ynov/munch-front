import { Profile } from "@/models/profile.model";
import { ColumnDef } from "@tanstack/react-table";
import { SortBtn } from "../../../table/sort.btn";
import { ActionButtons } from "@/components/table/actions-btn";
import api from "@/lib/api/profiles.api";

export const RestaurateursColumns: ColumnDef<Profile>[] = [
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
    id: "Restaurant",
    accessorKey: "restaurants",
    header: ({ column }) => <SortBtn column={column} />,
    cell: ({ cell }) => {
      return (
        cell.getValue() as {
          id: string;
          name: string;
        }[]
      ).map(({ id, name }: { id: string; name: string }) => (
        <div key={id} className="flex items-center space-x-2">
          <span>{name}</span>
        </div>
      ));
    },
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
    id: "Mis à jour le",
    accessorKey: "updatedAt",
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
