import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import { ConfirmProvider } from "./providers/confirm.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfirmProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster />
    </ConfirmProvider>
  </React.StrictMode>
);
