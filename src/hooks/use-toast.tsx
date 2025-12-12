import { type ReactNode, useCallback, useContext, useEffect } from 'react';

import { ToastContext } from '@/contexts/toast';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { setOpen, setContent, open } = context;

  const openToast = useCallback(
    (message: ReactNode) => {
      setOpen(true);
      setContent(message);
    },
    [setOpen, setContent]
  );

  useEffect(() => {
    if (!open) {
      setContent(null);
    }
  }, [open, setContent]);

  return {
    openToast,
    ...context,
  };
};
