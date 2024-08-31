import { Profile } from "@/models/profile.model";
import { ColumnDef } from "@tanstack/react-table";
import { SortBtn } from "./sort.btn";

export const RestaurateurColumns: ColumnDef<Profile>[] = [
  {
    id: "Avatar",
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ cell }) => {
      return (
        <img
          src={cell.getValue() as string}
          alt="avatar"
          className="rounded-md"
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
];
