import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../../table/data-table";
import api from "@/lib/api/profiles.api";
import { RoleEnum } from "@/models/enum/role-enum";
import { Loader } from "../../../ui/loader";
import { ErrorComponent } from "../../../error";
import { AdminColumns } from "./admin.columns";

export const AdminProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => await api.getProfilesByRole(RoleEnum.ADMIN),
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      {data && data.length === 0 && <p>Aucun administrateurs trouvé.</p>}
      {data && data.length > 0 && (
        <DataTable columns={AdminColumns} data={data} />
      )}
    </>
  );
};
