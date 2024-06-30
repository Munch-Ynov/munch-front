import { userAtom } from "@/features/auth/auth.store";
import { useAtom } from "jotai";

export const UserPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h1>Utilisateur Page</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
};
