import { AuthProvider } from "./features/auth/auth.provider";
import { MainRoutes } from "./routes/main-routes";

export default function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}
