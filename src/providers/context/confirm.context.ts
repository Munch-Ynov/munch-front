import { createContext } from "react";

interface ConfirmContextType {
  confirm: (message: string) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(
  undefined
);
