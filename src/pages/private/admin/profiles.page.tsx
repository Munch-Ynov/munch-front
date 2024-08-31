import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/profiles.api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleEnum } from "@/models/enum/role-enum";
import { DataTable } from "@/components/table/data-table";
import { RestaurateurColumns } from "@/components/table/restaurateur.columns";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";

export const ProfilesPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => await api.getProfilesByRole(RoleEnum.RESTAURATEUR),
    retry: false,
  });

  error &&
    toast.error("Une erreur s'est produite lors du chargement des données.");

  return (
    <Tabs defaultValue={RoleEnum.RESTAURATEUR}>
      <TabsList>
        <TabsTrigger value={RoleEnum.RESTAURATEUR}>Restaurateurs</TabsTrigger>
        <TabsTrigger value={RoleEnum.USER}>Clients</TabsTrigger>
        <TabsTrigger value={RoleEnum.ADMIN}>Administrateurs</TabsTrigger>
      </TabsList>
      {isLoading && <Loader />}
      {data && data.length === 0 && <p>Aucune donnée à afficher.</p>}
      <>
        <TabsContent value={RoleEnum.RESTAURATEUR}>
          {data && data.length > 0 && (
            <DataTable columns={RestaurateurColumns} data={data} />
          )}
        </TabsContent>
        <TabsContent value={RoleEnum.USER}>
          {/* <DataTable columns={UserColumns} data={data} /> */}
        </TabsContent>
        <TabsContent value={RoleEnum.ADMIN}>
          {/* <DataTable columns={AdminColumns} data={data} /> */}
        </TabsContent>
      </>
    </Tabs>
  );
};
