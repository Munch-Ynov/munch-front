import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../table/data-table";
import { RestaurateurColumns } from "../table/restaurateur.columns";
import api from "@/lib/api/profiles.api";
import { RoleEnum } from "@/models/enum/role-enum";
import { Loader } from "../ui/loader";
import { ErrorComponent } from "../error";

export const RestaurateurProfile = ({ role }: { role: RoleEnum }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => await api.getProfilesByRole(role),
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      {data && data.length === 0 && <p>Aucun restaurateur trouvé.</p>}
      {data && data.length > 0 && (
        <DataTable columns={RestaurateurColumns} data={data} />
      )}
    </>
  );
};
