/**
 * Store Review 관련 타입 정의 (Swagger 기반)
 */

/** 접근성 레벨 */
export type AccessLevelType = 1 | 2 | 3 | 4 | 5;

/** 계단 유무 */
export type HasStepType = 1 | 2 | 3;

/** 너비 등급 */
export type WidthClassType = 1 | 2 | 3 | 4 | 5;

/** 상점 검수 상태 (1: 대기, 2: 완료) */
export type StoreReviewStatusType = 1 | 2;

/** 라벨 기본 정보 */
export interface LabelBase {
  has_step: HasStepType | null;
  width_class: WidthClassType | null;
  has_movable_chair: boolean | null;
  has_high_chair: boolean | null;
  has_fixed_chair: boolean | null;
  has_floor_chair: boolean | null;
  is_not_sure_chair: boolean | null;
}

/** 페이지 정보 */
export interface PageInfo {
  total_pages: number;
  current_page: number;
  size: number;
}

/** 상점 응답 */
export interface StoreResponse {
  name: string;
  address: string;
  status: StoreReviewStatusType;
  id: number;
  access_level: AccessLevelType | null;
  total_image_count: number;
  ignored_image_count: number;
  label_info: LabelBase | null;
  review_finished_at: string | null;
  created_at: string;
  updated_at: string;
}

/** 상점 목록 응답 */
export interface StoreListResponse {
  stores: StoreResponse[];
  page_info: PageInfo;
}

/** 상점 간단 정보 */
export interface StoreSimpleResponse {
  name: string;
  address: string;
  status: StoreReviewStatusType;
  id: number;
}

/** 상점 간단 목록 응답 */
export interface StoreSimpleListResponse {
  stores: StoreSimpleResponse[];
}

/** 상점 검수 상세 응답 */
export interface StoreReviewDetailResponse {
  name: string;
  address: string;
  status: StoreReviewStatusType;
  image_analysis_result: LabelBase;
  label_info: LabelBase | null;
  images_urls: string[];
}

/** 상점 검수 라벨 요청 */
export interface StoreReviewLabelRequest {
  has_step: HasStepType | null;
  width_class: WidthClassType | null;
  has_movable_chair: boolean | null;
  has_high_chair: boolean | null;
  has_fixed_chair: boolean | null;
  has_floor_chair: boolean | null;
  is_not_sure_chair: boolean | null;
}

/** 상점 검수 라벨 응답 */
export interface StoreReviewLabelResponse {
  id: number;
  access_level: AccessLevelType;
}
