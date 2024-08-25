import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";

export const Home = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h1>Home - Utilisateur</h1>
    </div>
  );
};
