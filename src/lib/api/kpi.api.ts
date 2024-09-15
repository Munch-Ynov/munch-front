import { UserKPIResponse } from "@/models/kpi.model";
import { api } from "./api";

const prefix = "kpi";

async function getUserKPI(userId: string) {
  return api<UserKPIResponse>({
    url: `${prefix}/user/${userId}`,
    method: "GET",
  });
}

export default {
  getUserKPI,
};
