import { userAtom } from "@/features/auth/auth.store";
import { useAuth } from "@/features/auth/useAuth";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export function AuthStatus() {
  const { logout } = useAuth();
  const [user] = useAtom(userAtom);
  let navigate = useNavigate();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {user.name}!{" "}
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Sign out
      </button>
    </p>
  );
}
