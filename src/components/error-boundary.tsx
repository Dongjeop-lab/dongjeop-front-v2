/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { Component } from 'react';

import type { ApiError } from '@/lib/api-error';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // 커스텀 fallback이 있으면 사용
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      // 기본 fallback
      return (
        <DefaultErrorFallback
          error={this.state.error}
          reset={this.reset}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * 기본 에러 폴백 UI
 */
function DefaultErrorFallback({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // ApiError인 경우 사용자 친화적 메시지 표시
  const errorMessage =
    'getUserMessage' in error && typeof error.getUserMessage === 'function'
      ? (error as ApiError).getUserMessage()
      : error.message;

  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        오류가 발생했습니다
      </h2>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>{errorMessage}</p>
      <button
        onClick={reset}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
