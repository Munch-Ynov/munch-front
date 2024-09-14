import { ConfirmModal } from "@/components/confirm-modal";
import { ConfirmContext } from "@/providers/context/confirm.context";
import { useCallback, useState } from "react";

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<{
    title?: string;
    content?: string;
  }>({});

  const [resolve, setResolve] = useState<(value: boolean) => void>(
    () => () => { }
  );

  const confirm = useCallback((message: {
    title?: string;
    content?: string;
  }) => {
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
        title={message.title}
        content={message.content}
        isOpen={isOpen}
        onConfirm={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
      />
    </ConfirmContext.Provider>
  );
};
