import type { ComponentProps, ReactNode, SuspenseProps } from 'react';
import { Suspense, useCallback } from 'react';
import { css } from 'styled-system/css';

import { useToast } from '@/hooks/use-toast';
import { handleApiError } from '@/lib/api-error';

import { ErrorBoundary } from './error-boundary';

interface AsyncBoundaryProps {
  children: ReactNode;
  /** Suspense의 fallback (로딩 UI) */
  loadingFallback?: SuspenseProps['fallback'];
  /** ErrorBoundary의 fallback (에러 UI) */
  errorFallback?: ComponentProps<typeof ErrorBoundary>['fallback'];
  /** 에러 발생 시 토스트 표시 여부 (기본값: true) */
  showToastOnError?: boolean;
  /** 에러 발생 시 추가 콜백 */
  onError?: ComponentProps<typeof ErrorBoundary>['onError'];
}

/**
 * AsyncBoundary 컴포넌트
 * Suspense + ErrorBoundary를 하나로 조합한 래퍼
 * 에러 발생 시 자동으로 토스트 메시지를 표시합니다.
 *
 * @example
 * ```tsx
 * <AsyncBoundary
 *   loadingFallback={<Spinner />}
 *   errorFallback={(error, reset) => <ErrorUI error={error} onRetry={reset} />}
 * >
 *   <DataComponent />
 * </AsyncBoundary>
 * ```
 */
export function AsyncBoundary({
  children,
  loadingFallback = <DefaultLoadingFallback />,
  errorFallback,
  showToastOnError = true,
  onError,
}: AsyncBoundaryProps) {
  const { openToast } = useToast();

  const handleError = useCallback(
    (error: Error, errorInfo: React.ErrorInfo) => {
      // 토스트로 에러 메시지 표시
      if (showToastOnError) {
        const apiError = handleApiError(error);
        openToast(apiError.getUserMessage());
      }
      // 추가 콜백 실행
      onError?.(error, errorInfo);
    },
    [showToastOnError, openToast, onError]
  );

  return (
    <ErrorBoundary
      fallback={errorFallback}
      onError={handleError}
    >
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

function DefaultLoadingFallback() {
  return (
    <div
      className={css({
        padding: '8',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <div
        className={css({
          width: '8',
          height: '8',
          border: '3px solid',
          borderColor: 'gray.200',
          borderTopColor: 'blue.500',
          borderRadius: 'full',
          animation: 'spin 0.6s linear infinite',
        })}
      />
    </div>
  );
}
