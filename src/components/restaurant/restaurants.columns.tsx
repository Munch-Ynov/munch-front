import { PriceCategoryEnum } from "@/models/enum/price-category.enum";
import { Restaurant } from "@/models/restaurant.model";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Euro } from "lucide-react";
import { Button } from "../ui/button";
import { SortBtn } from "../table/sort.btn";

export const RestaurantsColumns: ColumnDef<Restaurant>[] = [
  {
    id: "Nom",
    accessorKey: "name",
    header: ({ column }) => <SortBtn column={column} />,
  },
  {
    id: "N° de SIRET",
    accessorKey: "n_siret",
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
    id: "Adresse",
    accessorKey: "address",
    header: ({ column }) => <SortBtn column={column} />,
  },
  {
    id: "Ville",
    accessorKey: "city",
    header: ({ column }) => <SortBtn column={column} />,
  },
  {
    id: "Code Postal",
    accessorKey: "code_postal",
    header: ({ column }) => <SortBtn column={column} />,
  },
  {
    id: "Prix",
    accessorKey: "price",
    header: ({ column }) => <SortBtn column={column} />,
    cell: ({ cell }) => {
      return cell.getValue() === PriceCategoryEnum.ECO ? (
        <div className="text-green-500 inline-flex">
          <Euro className="h-4 w-4 -m-0.5" />
        </div>
      ) : cell.getValue() === PriceCategoryEnum.MODERATE ? (
        <div className="text-yellow-500 inline-flex">
          <Euro className="h-4 w-4 -m-0.5" />
          <Euro className="h-4 w-4 -m-0.5" />
        </div>
      ) : cell.getValue() === PriceCategoryEnum.EXPENSIVE ? (
        <div className="text-red-500 inline-flex">
          <Euro className="h-4 w-4 -m-0.5" />
          <Euro className="h-4 w-4 -m-0.5" />
          <Euro className="h-4 w-4 -m-0.5" />
        </div>
      ) : cell.getValue() === PriceCategoryEnum.VERY_EXPENSIVE ? (
        <div className="text-red-800 inline-flex">
          <Euro className="h-4 w-4 -m-0.5" />
          <Euro className="h-4 w-4 -m-0.5" />
          <Euro className="h-4 w-4 -m-0.5" />
          <Euro className="h-4 w-4 -m-0.5" />
        </div>
      ) : (
        ""
      );
    },
    enableColumnFilter: false,
  },
  {
    id: "Date de création",
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Date de création
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return new Date(cell.getValue() as string).toLocaleString();
    },
    enableColumnFilter: false,
  },
];
