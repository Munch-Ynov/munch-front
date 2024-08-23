import { ConfirmModal } from "@/components/confirm-modal";
import { ConfirmContext } from "@/context/confirm.context";
import { useCallback, useState } from "react";

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [resolve, setResolve] = useState<(value: boolean) => void>(
    () => () => {}
  );

  const confirm = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);
    return new Promise<boolean>((res) => {
      setResolve(() => res);
    });
  }, []);

  const handleConfirm = (value: boolean) => {
    setIsOpen(false);
    resolve(value);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        message={message}
        isOpen={isOpen}
        onConfirm={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
      />
    </ConfirmContext.Provider>
  );
};
