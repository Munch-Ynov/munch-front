import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleEnum } from "@/models/enum/role-enum";
import { RestaurateurProfile } from "@/components/admin/profiles/restaurateurs/restaurateurs.profile";
import { UsersProfile } from "@/components/admin/profiles/users/users.profile";
import { AdminProfile } from "@/components/admin/profiles/admin/admin.profile";

export const ProfilesPage = () => {
  return (
    <Tabs defaultValue={RoleEnum.RESTAURATEUR}>
      <TabsList>
        <TabsTrigger value={RoleEnum.RESTAURATEUR}>Restaurateurs</TabsTrigger>
        <TabsTrigger value={RoleEnum.USER}>Clients</TabsTrigger>
        <TabsTrigger value={RoleEnum.ADMIN}>Administrateurs</TabsTrigger>
      </TabsList>
      <>
        <TabsContent value={RoleEnum.RESTAURATEUR}>
          <RestaurateurProfile />
        </TabsContent>
        <TabsContent value={RoleEnum.USER}>
          <UsersProfile />
        </TabsContent>
        <TabsContent value={RoleEnum.ADMIN}>
          <AdminProfile />
        </TabsContent>
      </>
    </Tabs>
  );
};
