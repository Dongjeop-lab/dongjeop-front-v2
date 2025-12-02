import { http, HttpResponse } from 'msw';

import type {
  StoreListResponse,
  StoreResponse,
  StoreReviewDetailResponse,
  StoreReviewLabelRequest,
  StoreReviewLabelResponse,
  StoreSimpleListResponse,
} from '@/pages/project/_types/store';

/**
 * Project 페이지 - Store Review API Mock Handlers (Swagger 기반)
 */

// Mock 데이터
const mockStores: StoreResponse[] = [
  {
    id: 1,
    name: '강남역 맛집',
    address: '서울시 강남구 강남대로 123',
    status: 1, // 대기
    access_level: null,
    total_image_count: 10,
    ignored_image_count: 0,
    label_info: null,
    review_finished_at: null,
    created_at: '2025-11-15T10:00:00Z',
    updated_at: '2025-11-15T10:00:00Z',
  },
  {
    id: 2,
    name: '서초동 카페',
    address: '서울시 서초구 서초대로 456',
    status: 2, // 완료
    access_level: 3,
    total_image_count: 8,
    ignored_image_count: 1,
    label_info: {
      has_step: 1,
      width_class: 3,
      has_movable_chair: true,
      has_high_chair: false,
      has_fixed_chair: true,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: '2025-11-14T15:00:00Z',
    created_at: '2025-11-14T09:00:00Z',
    updated_at: '2025-11-14T15:00:00Z',
  },
  {
    id: 3,
    name: '역삼동 레스토랑',
    address: '서울시 강남구 역삼로 789',
    status: 1,
    access_level: null,
    total_image_count: 15,
    ignored_image_count: 2,
    label_info: null,
    review_finished_at: null,
    created_at: '2025-11-15T11:00:00Z',
    updated_at: '2025-11-15T11:00:00Z',
  },
];

export const projectHandlers = [
  // GET /api/v1/projects/{project_id}/stores - 상태별 검수 목록 조회
  http.get('/api/v1/projects/:projectId/stores', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');
    const reviewStatus = url.searchParams.get('review_status');

    // 필터링
    let filtered = [...mockStores];

    if (reviewStatus) {
      filtered = filtered.filter(
        store => store.status === parseInt(reviewStatus)
      );
    }

    // 페이지네이션
    const start = (page - 1) * size;
    const end = start + size;
    const stores = filtered.slice(start, end);

    const response: StoreListResponse = {
      stores,
      page_info: {
        total_pages: Math.ceil(filtered.length / size),
        current_page: page,
        size,
      },
    };

    return HttpResponse.json(response);
  }),

  // GET /api/v1/reviews/stores - 검수 화면 상점 목록 조회 (간단)
  http.get('/api/v1/reviews/stores', ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('project_id');

    if (!projectId) {
      return HttpResponse.json(
        { detail: 'project_id is required' },
        { status: 422 }
      );
    }

    const response: StoreSimpleListResponse = {
      stores: mockStores.map(store => ({
        id: store.id,
        name: store.name,
        address: store.address,
        status: store.status,
      })),
    };

    return HttpResponse.json(response);
  }),

  // GET /api/v1/reviews/stores/{store_id} - 검수 화면 상점 상세 정보 조회
  http.get('/api/v1/reviews/stores/:storeId', ({ params }) => {
    const { storeId } = params;
    const store = mockStores.find(s => s.id === parseInt(storeId as string));

    if (!store) {
      return HttpResponse.json({ detail: 'Store not found' }, { status: 404 });
    }

    const response: StoreReviewDetailResponse = {
      name: store.name,
      address: store.address,
      status: store.status,
      image_analysis_result: {
        has_step: 2,
        width_class: 3,
        has_movable_chair: true,
        has_high_chair: false,
        has_fixed_chair: true,
        has_floor_chair: false,
        is_not_sure_chair: false,
      },
      label_info: store.label_info,
      images_urls: [
        'https://via.placeholder.com/400x300?text=Image+1',
        'https://via.placeholder.com/400x300?text=Image+2',
        'https://via.placeholder.com/400x300?text=Image+3',
      ],
    };

    return HttpResponse.json(response);
  }),

  // POST /api/v1/reviews/stores/{store_id}/label - 상점 검수 라벨 등록/수정
  http.post(
    '/api/v1/reviews/stores/:storeId/label',
    async ({ params, request }) => {
      const { storeId } = params;
      const body = (await request.json()) as StoreReviewLabelRequest;

      const storeIndex = mockStores.findIndex(
        s => s.id === parseInt(storeId as string)
      );

      if (storeIndex === -1) {
        return HttpResponse.json(
          { detail: 'Store not found' },
          { status: 404 }
        );
      }

      // 라벨 정보 업데이트
      mockStores[storeIndex].label_info = body;
      mockStores[storeIndex].status = 2; // 완료로 변경
      mockStores[storeIndex].access_level = 3; // 임시 접근성 레벨
      mockStores[storeIndex].review_finished_at = new Date().toISOString();

      const response: StoreReviewLabelResponse = {
        id: mockStores[storeIndex].id,
        access_level: 3,
      };

      return HttpResponse.json(response);
    }
  ),
];
