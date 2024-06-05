import { Route, Routes } from "react-router-dom";
import PublicPage from "./pages/public";
import { LoginPage } from "./pages/auth/login.page";
import { RequireAuth } from "./components/auth/require-auth";
import ProtectedPage from "./pages/protected";
import { AuthProvider } from "./provider/auth.provider";
import { Layout } from "./components/layout";

export default function App() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>
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
