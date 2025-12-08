import { api } from '@/lib/api-client';

import type {
  ImageDetailResponse,
  StoreListResponse,
  StoreReviewDetailResponse,
  StoreReviewLabelRequest,
  StoreReviewLabelResponse,
  StoreReviewStatusType,
  StoreSimpleListResponse,
} from '../_types/store';

/**
 * Store Review API 함수들 (Swagger 기반)
 */

/** 상태별 검수 목록 조회 (전체/대기/완료) */
export const getStores = (
  projectId: number,
  params?: {
    page?: number;
    size?: number;
    review_status?: StoreReviewStatusType;
  }
) => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.size) searchParams.append('size', params.size.toString());
  if (params?.review_status)
    searchParams.append('review_status', params.review_status.toString());

  const query = searchParams.toString();
  return api.get<StoreListResponse>(
    `/projects/${projectId}/stores${query ? `?${query}` : ''}`
  );
};

/** 검수 화면 상점 목록 조회 (간단 정보) */
export const getStoresSimple = (projectId: number) => {
  return api.get<StoreSimpleListResponse>(
    `/reviews/stores?project_id=${projectId}`
  );
};

/** 검수 화면 상점 상세 정보 조회 */
export const getStoreDetail = (storeId: number) => {
  return api.get<StoreReviewDetailResponse>(`/reviews/stores/${storeId}`);
};

/** 상점 검수 라벨 등록/수정 */
export const createOrUpdateStoreLabel = (
  storeId: number,
  data: StoreReviewLabelRequest
) => {
  return api.post<StoreReviewLabelResponse>(
    `/reviews/stores/${storeId}/label`,
    data
  );
};

/** 이미지 상세 정보 조회 */
export const getImageDetail = (imageId: number) => {
  return api.get<ImageDetailResponse>(`/reviews/images/${imageId}`);
};

/** 이미지 무시 처리 */
export const ignoreImage = (imageId: number) => {
  return api.put<void>(`/reviews/images/${imageId}/ignore`);
};
