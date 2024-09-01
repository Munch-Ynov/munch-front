import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/profiles.api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleEnum } from "@/models/enum/role-enum";
import { DataTable } from "@/components/table/data-table";
import { RestaurateurColumns } from "@/components/table/restaurateur.columns";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";
import { RestaurateurProfile } from "@/components/admin/restaurateurs.profile";

export const ProfilesPage = () => {
  const [roleSelected, setRoleSelected] = useState<RoleEnum>(
    RoleEnum.RESTAURATEUR
  );

  return (
    <Tabs
      defaultValue={RoleEnum.RESTAURATEUR}
      onValueChange={(value: string) => setRoleSelected(value as RoleEnum)}
    >
      <TabsList>
        <TabsTrigger value={RoleEnum.RESTAURATEUR}>Restaurateurs</TabsTrigger>
        <TabsTrigger value={RoleEnum.USER}>Clients</TabsTrigger>
        <TabsTrigger value={RoleEnum.ADMIN}>Administrateurs</TabsTrigger>
      </TabsList>
      <>
        <TabsContent value={RoleEnum.RESTAURATEUR}>
          <RestaurateurProfile role={roleSelected} />
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
