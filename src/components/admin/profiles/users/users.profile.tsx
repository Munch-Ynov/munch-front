import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../../table/data-table";
import api from "@/lib/api/profiles.api";
import { RoleEnum } from "@/models/enum/role-enum";
import { Loader } from "../../../ui/loader";
import { ErrorComponent } from "../../../error";
import { UsersColumns } from "./users.columns";

export const UsersProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-profiles"],
    queryFn: async () => await api.getProfilesByRole(RoleEnum.USER),
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      {data && data.length === 0 && <p>Aucun utilisateur trouvé.</p>}
      {data && data.length > 0 && (
        <DataTable columns={UsersColumns} data={data} />
      )}
    </>
  );
};
