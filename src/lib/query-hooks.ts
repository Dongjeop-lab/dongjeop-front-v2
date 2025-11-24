import {
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import type { ApiError } from './api-error';

/**
 * useQuery 래퍼
 * - 타입 안전성 강화
 * - 에러 처리 자동화
 * - 공통 옵션 적용
 */
export function useApiQuery<
  TData = unknown,
  TError = ApiError,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TData, TError, TData, TQueryKey> & {
    queryKey: TQueryKey;
    queryFn: () => Promise<TData>;
  }
) {
  return useQuery<TData, TError, TData, TQueryKey>({
    // 기본 옵션
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: (failureCount, error) => {
      // 4xx 에러는 재시도 안 함
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
    ...options,
  });
}

/**
 * useSuspenseQuery 래퍼
 * - Suspense 모드로 데이터 로딩
 * - ErrorBoundary와 함께 사용
 * - 타입 안전성 강화
 *
 * @example
 * ```tsx
 * <AsyncBoundary>
 *   <DataComponent />
 * </AsyncBoundary>
 *
 * function DataComponent() {
 *   const { data } = useSuspenseApiQuery({
 *     queryKey: ['data'],
 *     queryFn: fetchData,
 *   });
 *   // data는 항상 정의되어 있음 (undefined 체크 불필요)
 *   return <div>{data.name}</div>;
 * }
 * ```
 */
export function useSuspenseApiQuery<
  TData = unknown,
  TError = ApiError,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseSuspenseQueryOptions<TData, TError, TData, TQueryKey> & {
    queryKey: TQueryKey;
    queryFn: () => Promise<TData>;
  }
) {
  return useSuspenseQuery<TData, TError, TData, TQueryKey>({
    // 기본 옵션
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    ...options,
  });
}

/**
 * useMutation 래퍼
 * - 타입 안전성 강화
 * - 에러 처리 자동화
 */
export function useApiMutation<
  TData = unknown,
  TError = ApiError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> & {
    mutationFn: (variables: TVariables) => Promise<TData>;
  }
) {
  return useMutation<TData, TError, TVariables, TContext>(options);
}

/**
 * Query Key Factory
 * 일관된 쿼리 키 생성을 위한 헬퍼
 *
 * @example
 * projects: {
 *   all: ['projects'] as const,
 *   list: (filters?: Record<string, unknown>) => ['projects', 'list', filters] as const,
 *   detail: (id: string) => ['projects', 'detail', id] as const,
 * }
 */
export const queryKeys = {
  /** 프로젝트 관련 쿼리 */
  projects: {
    all: ['projects'] as const,
    list: () => [...queryKeys.projects.all, 'list'] as const,
    detail: (id: string) =>
      [...queryKeys.projects.all, 'detail', { id }] as const,
  },
};
