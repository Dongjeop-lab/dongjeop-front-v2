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
    name: '스타벅스 강남점',
    address: '서울특별시 강남구 테헤란로 123',
    status: 1,
    access_level: 1,
    total_image_count: 15,
    ignored_image_count: 2,
    label_info: {
      has_step: 1,
      width_class: 5,
      has_movable_chair: true,
      has_high_chair: false,
      has_fixed_chair: true,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: null,
    created_at: '2024-11-28T10:00:00Z',
    updated_at: '2024-12-01T14:30:00Z',
  },
  {
    id: 2,
    name: '투썸플레이스 서초점',
    address: '서울특별시 서초구 서초대로 456',
    status: 1,
    access_level: 2,
    total_image_count: 12,
    ignored_image_count: 1,
    label_info: {
      has_step: 2,
      width_class: 3,
      has_movable_chair: true,
      has_high_chair: true,
      has_fixed_chair: false,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: null,
    created_at: '2024-11-28T11:00:00Z',
    updated_at: '2024-12-01T15:20:00Z',
  },
  {
    id: 3,
    name: '카페베네 역삼점',
    address: '서울특별시 강남구 역삼로 789',
    status: 2,
    access_level: 3,
    total_image_count: 20,
    ignored_image_count: 3,
    label_info: {
      has_step: 3,
      width_class: 1,
      has_movable_chair: false,
      has_high_chair: false,
      has_fixed_chair: true,
      has_floor_chair: true,
      is_not_sure_chair: false,
    },
    review_finished_at: '2024-11-30T10:15:00Z',
    created_at: '2024-11-25T09:00:00Z',
    updated_at: '2024-11-30T10:15:00Z',
  },
  {
    id: 4,
    name: '이디야커피 논현점',
    address: '서울특별시 강남구 논현로 321',
    status: 2,
    access_level: 4,
    total_image_count: 8,
    ignored_image_count: 0,
    label_info: {
      has_step: 1,
      width_class: 4,
      has_movable_chair: true,
      has_high_chair: true,
      has_fixed_chair: false,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: '2024-11-30T11:45:00Z',
    created_at: '2024-11-26T10:00:00Z',
    updated_at: '2024-11-30T11:45:00Z',
  },
  {
    id: 5,
    name: '할리스커피 삼성점',
    address: '서울특별시 강남구 삼성로 654',
    status: 1,
    access_level: 5,
    total_image_count: 18,
    ignored_image_count: 5,
    label_info: {
      has_step: 2,
      width_class: 2,
      has_movable_chair: false,
      has_high_chair: false,
      has_fixed_chair: true,
      has_floor_chair: false,
      is_not_sure_chair: true,
    },
    review_finished_at: null,
    created_at: '2024-11-29T08:00:00Z',
    updated_at: '2024-12-02T09:30:00Z',
  },
  {
    id: 6,
    name: '커피빈 선릉점',
    address: '서울특별시 강남구 선릉로 987',
    status: 2,
    access_level: null,
    total_image_count: 5,
    ignored_image_count: 0,
    label_info: null,
    review_finished_at: '2024-11-29T16:20:00Z',
    created_at: '2024-11-27T14:00:00Z',
    updated_at: '2024-11-29T16:20:00Z',
  },
  {
    id: 7,
    name: '메가커피 도곡점',
    address: '서울특별시 강남구 도곡로 234',
    status: 1,
    access_level: 2,
    total_image_count: 10,
    ignored_image_count: 1,
    label_info: {
      has_step: 1,
      width_class: 4,
      has_movable_chair: true,
      has_high_chair: false,
      has_fixed_chair: true,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: null,
    created_at: '2024-11-30T09:00:00Z',
    updated_at: '2024-12-02T10:15:00Z',
  },
  {
    id: 8,
    name: '파스쿠찌 청담점',
    address: '서울특별시 강남구 청담로 567',
    status: 1,
    access_level: null,
    total_image_count: 7,
    ignored_image_count: 0,
    label_info: null,
    review_finished_at: null,
    created_at: '2024-12-01T08:30:00Z',
    updated_at: '2024-12-01T08:30:00Z',
  },
  {
    id: 9,
    name: '탐앤탐스 압구정점',
    address: '서울특별시 강남구 압구정로 890',
    status: 2,
    access_level: 3,
    total_image_count: 14,
    ignored_image_count: 2,
    label_info: {
      has_step: 2,
      width_class: 3,
      has_movable_chair: true,
      has_high_chair: true,
      has_fixed_chair: true,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: '2024-12-01T13:30:00Z',
    created_at: '2024-11-28T15:00:00Z',
    updated_at: '2024-12-01T13:30:00Z',
  },
  {
    id: 10,
    name: '빽다방 신사점',
    address: '서울특별시 강남구 신사로 345',
    status: 1,
    access_level: 1,
    total_image_count: 22,
    ignored_image_count: 4,
    label_info: {
      has_step: 1,
      width_class: 5,
      has_movable_chair: true,
      has_high_chair: false,
      has_fixed_chair: false,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: null,
    created_at: '2024-11-29T11:00:00Z',
    updated_at: '2024-12-02T14:00:00Z',
  },
  {
    id: 11,
    name: '엔제리너스 대치점',
    address: '서울특별시 강남구 대치로 678',
    status: 2,
    access_level: 4,
    total_image_count: 9,
    ignored_image_count: 0,
    label_info: {
      has_step: 3,
      width_class: 2,
      has_movable_chair: false,
      has_high_chair: true,
      has_fixed_chair: true,
      has_floor_chair: false,
      is_not_sure_chair: false,
    },
    review_finished_at: '2024-12-01T09:20:00Z',
    created_at: '2024-11-27T13:00:00Z',
    updated_at: '2024-12-01T09:20:00Z',
  },
  {
    id: 12,
    name: '컴포즈커피 개포점',
    address: '서울특별시 강남구 개포로 123',
    status: 1,
    access_level: null,
    total_image_count: 11,
    ignored_image_count: 1,
    label_info: null,
    review_finished_at: null,
    created_at: '2024-12-02T07:00:00Z',
    updated_at: '2024-12-02T07:00:00Z',
  },
  {
    id: 13,
    name: '블루보틀 압구정점',
    address: '서울특별시 강남구 압구정로 456',
    status: 1,
    access_level: 5,
    total_image_count: 25,
    ignored_image_count: 6,
    label_info: {
      has_step: 1,
      width_class: 4,
      has_movable_chair: true,
      has_high_chair: true,
      has_fixed_chair: true,
      has_floor_chair: true,
      is_not_sure_chair: false,
    },
    review_finished_at: null,
    created_at: '2024-11-30T12:00:00Z',
    updated_at: '2024-12-02T16:00:00Z',
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
      images: [
        { id: 1, image_url: 'https://via.placeholder.com/400x300?text=Image+1', ignored: false },
        { id: 2, image_url: 'https://via.placeholder.com/400x300?text=Image+2', ignored: false },
        { id: 3, image_url: 'https://via.placeholder.com/400x300?text=Image+3', ignored: true },
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

  // PUT /api/v1/reviews/images/{image_id}/ignore - 이미지 무시 처리
  http.put('/api/v1/reviews/images/:imageId/ignore', ({ params }) => {
    const { imageId } = params;
    console.log(`[MSW] 이미지 ${imageId} 무시 처리`);
    return HttpResponse.json({});
  }),
];
