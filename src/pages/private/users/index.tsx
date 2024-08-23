import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";

export const UserPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h1>Page Utilisateur</h1>
    </div>
  );
};
