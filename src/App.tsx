import { Route, Routes } from "react-router-dom";
import PublicPage from "./pages/public";
import { LoginPage } from "./pages/auth/login.page";
import { RequireAuth } from "./features/auth/require-auth";
import ProtectedPage from "./pages/protected";
import { AuthProvider } from "./features/auth/auth.provider";
import { Layout } from "./components/layout";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
