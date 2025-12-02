import type { StoreReviewStatusType } from './store';

/**
 * Hook Params 타입 정의
 * 각 hook에서 재사용 가능한 파라미터 타입
 */

/** 상태별 검수 목록 조회 파라미터 */
export interface UseStoresParams extends Record<string, unknown> {
  page?: number;
  size?: number;
  review_status?: StoreReviewStatusType;
}

/** 검수 화면 상점 목록 조회 파라미터 (간단 정보) */
export interface UseStoresSimpleParams {
  projectId: number;
}

/** 검수 화면 상점 상세 정보 조회 파라미터 */
export interface UseStoreDetailParams {
  storeId: number;
}
