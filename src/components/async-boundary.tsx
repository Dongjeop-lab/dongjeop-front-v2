import type { ComponentProps, ReactNode, SuspenseProps } from 'react';
import { Suspense } from 'react';

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
      style={{
        padding: '2rem',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '2rem',
          height: '2rem',
          border: '3px solid #e5e7eb',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
