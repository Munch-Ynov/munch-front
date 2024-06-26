import { Label } from "@/components/ui/label";
import { AuthContext } from "@/features/auth/auth.provider";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
  const { login } = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    login(username, password).then(() => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div className="mt-10">
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <Label>
          Username: <input name="username" type="text" />
        </Label>{" "}
        <Label>
          Password: <input name="password" type="password" />
        </Label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
