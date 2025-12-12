/**
 * API 관련 공통 타입 정의
 */

/** API 응답 기본 구조 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}
export interface HTTPValidationError {
  detail: ValidationError[];
}

/** API 에러 응답 구조 */
export interface ApiErrorResponse {
  message?: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
  detail?: ValidationError[] | string;
}

/** 페이지네이션 요청 파라미터 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/** 페이지네이션 응답 메타데이터 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/** 페이지네이션 응답 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
