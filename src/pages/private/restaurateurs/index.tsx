import { useAuth } from "@/features/auth/auth.provider";

export const RestaurateurPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h1>Restaurateur Page</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
};
