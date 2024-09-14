import { createContext } from "react";

interface ConfirmContextType {
  confirm: ({
    title,
    content,
  }: {
    title?: string;
    content?: string;
  }) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(
  undefined
);
