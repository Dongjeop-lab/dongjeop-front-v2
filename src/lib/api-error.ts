import type { AxiosError } from 'axios';

import type { ApiErrorResponse, ValidationError } from '@/types/api';

/**
 * FastAPI ValidationError 배열에서 사용자 친화적 메시지 추출
 */
function extractValidationMessage(detail: ValidationError[]): string {
  if (!detail || detail.length === 0) {
    return '입력값을 확인해주세요.';
  }

  // 첫 번째 에러 메시지를 반환하거나, 여러 개일 경우 결합
  const messages = detail.map(error => {
    const field = error.loc.slice(1).join('.') || '입력값';
    return `${field}: ${error.msg}`;
  });

  return messages.length === 1 ? messages[0] : messages.join(', ');
}

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: Record<string, string[]>;
  validationErrors?: ValidationError[];

  constructor(
    message: string,
    status: number,
    code?: string,
    errors?: Record<string, string[]>,
    validationErrors?: ValidationError[]
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.errors = errors;
    this.validationErrors = validationErrors;
  }

  /** 서버 에러인지 확인 */
  isServerError(): boolean {
    return this.status >= 500;
  }

  /** 클라이언트 에러인지 확인 */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /** 네트워크 에러인지 확인 */
  isNetworkError(): boolean {
    return this.status === 0;
  }

  /** 검증 에러인지 확인 (422) */
  isValidationError(): boolean {
    return this.status === 422;
  }

  /** 사용자에게 보여줄 에러 메시지 */
  getUserMessage(): string {
    if (this.isNetworkError()) {
      return '네트워크 연결을 확인해주세요.';
    }
    if (this.isServerError()) {
      return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
    return this.message || '알 수 없는 오류가 발생했습니다.';
  }
}

/**
 * Axios 에러를 ApiError로 변환
 */
export function handleApiError(error: unknown): ApiError {
  // Axios 에러인 경우
  if (
    error &&
    typeof error === 'object' &&
    'isAxiosError' in error &&
    error.isAxiosError
  ) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // 응답이 있는 경우 (4xx, 5xx)
    if (axiosError.response) {
      const { data, status } = axiosError.response;

      if (status === 422 && data?.detail && Array.isArray(data.detail)) {
        const validationErrors = data.detail as ValidationError[];
        return new ApiError(
          extractValidationMessage(validationErrors),
          status,
          undefined,
          undefined,
          validationErrors
        );
      }

      if (typeof data?.detail === 'string') {
        return new ApiError(data.detail, status, data?.code, data?.errors);
      }

      return new ApiError(
        data?.message || '요청을 처리할 수 없습니다.',
        status,
        data?.code,
        data?.errors
      );
    }

    // 요청은 보냈지만 응답이 없는 경우 (네트워크 에러)
    if (axiosError.request) {
      return new ApiError('네트워크 연결을 확인해주세요.', 0);
    }

    // 요청 설정 중 에러
    return new ApiError(axiosError.message, 0);
  }

  // ApiError인 경우
  if (error instanceof ApiError) {
    return error;
  }

  // 일반 에러인 경우
  if (error instanceof Error) {
    return new ApiError(error.message, 0);
  }

  // 알 수 없는 에러
  return new ApiError('알 수 없는 오류가 발생했습니다.', 0);
}
