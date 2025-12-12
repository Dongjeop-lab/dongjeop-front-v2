import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useEffect } from 'react';

import { useToast } from '@/hooks/use-toast';

import { handleApiError } from './api-error';

// Mutation 에러를 위한 커스텀 이벤트
const MUTATION_ERROR_EVENT = 'mutation-error';

interface MutationErrorDetail {
  message: string;
}

// 모듈 레벨에서 QueryClient 생성 (한 번만 생성됨)
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: error => {
      const apiError = handleApiError(error);
      // 커스텀 이벤트 발생
      window.dispatchEvent(
        new CustomEvent<MutationErrorDetail>(MUTATION_ERROR_EVENT, {
          detail: { message: apiError.getUserMessage() },
        })
      );
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (
          error &&
          typeof error === 'object' &&
          'status' in error &&
          typeof error.status === 'number'
        ) {
          if (error.status >= 400 && error.status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const { openToast } = useToast();

  // Mutation 에러 이벤트 수신하여 toast 표시
  useEffect(() => {
    const handleMutationError = (event: Event) => {
      const { message } = (event as CustomEvent<MutationErrorDetail>).detail;
      openToast(message);
    };

    window.addEventListener(MUTATION_ERROR_EVENT, handleMutationError);
    return () => {
      window.removeEventListener(MUTATION_ERROR_EVENT, handleMutationError);
    };
  }, [openToast]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.MODE === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
