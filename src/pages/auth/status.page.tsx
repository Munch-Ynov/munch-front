import { AuthContext } from "@/features/auth/auth.provider";
import { userAtom } from "@/features/auth/auth.store";
import { useAtom } from "jotai";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function AuthStatus() {
  const { logout } = useContext(AuthContext);
  const [user] = useAtom(userAtom);
  let navigate = useNavigate();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {user}!{" "}
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
