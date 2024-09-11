import {
  File,
  ListFilter,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const products = [
  {
    imgSrc: "/placeholder.svg",
    name: "John Doe",
    status: "Annulé",
    price: "499,99 $",
    totalSales: 25,
    createdAt: "12 juillet 2023 à 10h42",
  },
  {
    imgSrc: "/placeholder.svg",
    name: "Jane Smith",
    status: "Réservé",
    price: "129,99 $",
    totalSales: 100,
    createdAt: "18 octobre 2023 à 15h21",
  },
  {
    imgSrc: "/placeholder.svg",
    name: "Robert Johnson",
    status: "Réservé",
    price: "39,99 $",
    totalSales: 50,
    createdAt: "29 novembre 2023 à 08h15",
  },
  {
    imgSrc: "/placeholder.svg",
    name: "Emily DavAnnuleris",
    status: "Annulé",
    price: "2,99 $",
    totalSales: 0,
    createdAt: "25 décembre 2023 à 23h59",
  },
  {
    imgSrc: "/placeholder.svg",
    name: "Michael Wilson",
    status: "Réservé",
    price: "59,99 $",
    totalSales: 75,
    createdAt: "1er janvier 2024 à 00h00",
  },
  {
    imgSrc: "/placeholder.svg",
    name: "Sophia Anderson",
    status: "Réservé",
    price: "199,99 $",
    totalSales: 30,
    createdAt: "14 février 2024 à 14h14",
  },
];

export const ReservationsPage = () => {
  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="active">À venir</TabsTrigger>
              <TabsTrigger value="draft">Passées</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Aujourd'hui
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>A venir</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Passées</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                Ajouter
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Réservations</CardTitle>
                <CardDescription>
                  Liste des réservations de vos clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">img</span>
                      </TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Nombre de personnes
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Heure d'arrivée
                      </TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt="Product img"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={product.imgSrc}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.totalSales}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.createdAt}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant={"ghost"}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant={"ghost"} className="text-red-500">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
