import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query 클라이언트
 * 전역 쿼리 옵션 설정
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분간 데이터를 fresh로 간주
      staleTime: 1000 * 60 * 5,
      // 10분간 캐시 유지
      gcTime: 1000 * 60 * 10,
      // 윈도우 포커스 시 자동 refetch 비활성화
      refetchOnWindowFocus: false,
      // 에러 발생 시 재시도 설정
      retry: (failureCount, error) => {
        // 4xx 에러는 재시도하지 않음
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
        // 최대 3번까지 재시도
        return failureCount < 3;
      },
    },
    mutations: {
      // mutation 에러 시 재시도하지 않음
      retry: false,
    },
  },
});
