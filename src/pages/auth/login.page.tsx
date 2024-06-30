import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
  const { login } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    login(email, password).then(() => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Label>
          Email: <Input name="email" type="text" />
        </Label>{" "}
        <Label>
          Password: <Input name="password" type="password" />
        </Label>{" "}
        <Button type="submit">Log in</Button>
      </form>
    </div>
  );
}
