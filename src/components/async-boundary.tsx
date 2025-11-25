import type { ComponentProps, ReactNode, SuspenseProps } from 'react';
import { Suspense } from 'react';
import { css } from 'styled-system/css';

import { ErrorBoundary } from './error-boundary';

interface AsyncBoundaryProps {
  children: ReactNode;
  /** Suspense의 fallback (로딩 UI) */
  loadingFallback?: SuspenseProps['fallback'];
  /** ErrorBoundary의 fallback (에러 UI) */
  errorFallback?: ComponentProps<typeof ErrorBoundary>['fallback'];
  /** 에러 발생 시 콜백 */
  onError?: ComponentProps<typeof ErrorBoundary>['onError'];
}

/**
 * AsyncBoundary 컴포넌트
 * Suspense + ErrorBoundary를 하나로 조합한 래퍼
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
  onError,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={errorFallback}
      onError={onError}
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
