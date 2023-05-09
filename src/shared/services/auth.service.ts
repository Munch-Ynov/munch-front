import type { LoginForm, User } from "../interfaces/User.interface";
const BASE_URL = "/api/auth";

export async function login(
  loginForm: LoginForm
): Promise<{ user: User; accessToken: string }> {
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    body: JSON.stringify(loginForm),
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}
