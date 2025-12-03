import { useLocation, useParams } from 'react-router';
import { css } from 'styled-system/css';

import Pagination from '@/components/pagination';
import Tabs from '@/components/tabs';

import type { StoreResponse } from '../_types/store';
import StoreListTable from './store-list-table';

/**
 * 프로젝트 상세 화면 (장소 목록 화면)
 * @route /project/:projectId
 */

const TAB_VALUES = {
  ALL: 'all',
  REVIEWING: 'reviewing',
  COMPLETED: 'completed',
} as const;

// TODO: 실제 API 연동
const MOCK_STORES: StoreResponse[] = [
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

export const ProjectDetailView = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName || `프로젝트 ${projectId}`;

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        gap: '1.875rem',
        width: '100%',
        height: '100%',
      })}
    >
      <header
        className={css({
          width: 'full',
          color: '#000000',
          fontSize: '4xl',
          fontWeight: '700',
          lineHeight: '1.75rem',
          textAlign: 'left',
        })}
      >
        {projectName}
      </header>

      {/* 테이블 영역 */}
      <div
        className={css({
          display: 'flex',
          flex: 1,
          flexDir: 'column',
          gap: '1.5rem',
          width: 'full',
          padding: '1.5rem',
          bg: '#ffffff',
          borderRadius: 'xl',
          boxShadow: '0px 4px 24px 0px #0000000A',
        })}
      >
        <div
          className={css({
            display: 'flex',
            gap: '1rem',
            color: 'text.dashboard.secondary',
            fontSize: '1.25rem',
          })}
        >
          <span className={css({ fontWeight: '600' })}>전체 장소</span>
          <p>
            <span
              className={css({ color: 'button.primary', fontWeight: '700' })}
            >
              500
            </span>
            <span className={css({ fontWeight: '500' })}> / 700</span>
          </p>
        </div>

        {/* tab */}
        <div>
          <Tabs.Root defaultValue={TAB_VALUES.ALL}>
            <Tabs.List>
              <Tabs.Trigger value={TAB_VALUES.ALL}>전체</Tabs.Trigger>
              <Tabs.Trigger value={TAB_VALUES.REVIEWING}>
                검수 대기
              </Tabs.Trigger>
              <Tabs.Trigger value={TAB_VALUES.COMPLETED}>
                검수 완료
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={TAB_VALUES.ALL}>
              <StoreListTable filteredStores={MOCK_STORES} />
            </Tabs.Content>
            <Tabs.Content value={TAB_VALUES.REVIEWING}>
              <StoreListTable filteredStores={MOCK_STORES} />
            </Tabs.Content>
            <Tabs.Content value={TAB_VALUES.COMPLETED}>
              <StoreListTable filteredStores={MOCK_STORES} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>

      {/* TODO: 실제 값으로 교체 */}
      <Pagination totalItems={MOCK_STORES.length} />
    </div>
  );
};
