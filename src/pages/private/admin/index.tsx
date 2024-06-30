import { userAtom } from "@/features/auth/auth.store";
import { useAtom } from "jotai";

export const AdminPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
};
