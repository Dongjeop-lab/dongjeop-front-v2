/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { Component } from 'react';
import { css } from 'styled-system/css';

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
  const errorMessage =
    'getUserMessage' in error && typeof error.getUserMessage === 'function'
      ? (error as ApiError).getUserMessage()
      : error.message;

  return (
    <div
      className={css({
        padding: '8',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <h2
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          marginBottom: '4',
        })}
      >
        오류가 발생했습니다
      </h2>
      <p
        className={css({
          color: 'gray.600',
          marginBottom: '6',
        })}
      >
        {errorMessage}
      </p>
      <button
        onClick={reset}
        className={css({
          padding: '2 4',
          backgroundColor: 'blue.500',
          color: 'white',
          border: 'none',
          borderRadius: 'md',
          cursor: 'pointer',
          _hover: {
            backgroundColor: 'blue.600',
          },
        })}
      >
        다시 시도
      </button>
    </div>
  );
}
