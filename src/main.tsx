import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import Toast from './components/toast';
import { ToastProvider } from './contexts/toast';
import { QueryProvider } from './lib/query-provider';
import { router } from './routes';

// MSW 시작 (개발 환경에서만)
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 실제 API로 전달
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <Toast />
        </ToastProvider>
      </QueryProvider>
    </StrictMode>
  );
});
