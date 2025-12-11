import { type ReactNode, useContext, useEffect } from 'react';

import { ToastContext } from '@/contexts/toast';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const openToast = (message: ReactNode) => {
    context.setOpen(true);
    context.setContent(message);
  };

  useEffect(() => {
    if (!context.open) {
      context.setContent(null);
    }
  }, [context]);

  return {
    openToast,
    ...context,
  };
};
