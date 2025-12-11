import { createContext, type ReactNode, useState } from 'react';

interface ToastContextType {
  open: boolean;
  content: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<ReactNode>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  return (
    <ToastContext.Provider value={{ open, setOpen, content, setContent }}>
      {children}
    </ToastContext.Provider>
  );
};
