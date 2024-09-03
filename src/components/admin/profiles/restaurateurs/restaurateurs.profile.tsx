import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../../table/data-table";
import { RestaurateursColumns } from "./restaurateurs.columns";
import { RoleEnum } from "@/models/enum/role-enum";
import { Loader } from "../../../ui/loader";
import { ErrorComponent } from "../../../error";
import api from "@/lib/api/profiles.api";
import { useState } from "react";
import { cp } from "fs";

export const RestaurateurProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurateur-profiles"],
    queryFn: async () => await api.getProfilesByRole(RoleEnum.RESTAURATEUR),
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  // // handleEditRow
  // const handleEditRow = (id: string) => {
  //   setOpenModal(true);
  //   setSelectedRow(id);
  // };

  return (
    <>
      {data && data.length === 0 && <p>Aucun restaurateur trouvé.</p>}
      {data && data.length > 0 && (
        <DataTable columns={RestaurateursColumns} data={data} />
      )}
    </>
  );
};
