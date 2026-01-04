import { useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router';
import { css } from 'styled-system/css';

import Pagination from '@/components/pagination';
import Tabs from '@/components/tabs';

import { useSuspenseStores } from '../_hooks/useSuspenseStores';
import type { SortOrderType } from '../_types/params';
import type { StoreReviewStatusType } from '../_types/store';
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

type TabValue = (typeof TAB_VALUES)[keyof typeof TAB_VALUES];

const STATUS_MAP: Record<string, StoreReviewStatusType | undefined> = {
  [TAB_VALUES.ALL]: undefined, // 전체 (필터 없음)
  [TAB_VALUES.REVIEWING]: 1, // 검수 대기
  [TAB_VALUES.COMPLETED]: 2, // 검수 완료
} as const;

const INITIAL_PAGE = 1;
const PAGE_SIZE = 10;

export const ProjectDetailView = () => {
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const projectName =
    location.state?.projectName ||
    localStorage.getItem(`project_${projectId}_name`) ||
    `프로젝트 ${projectId}`;

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [currentTab, setCurrentTab] = useState<TabValue>(TAB_VALUES.ALL);
  const sortOrder = (searchParams.get('sort') as SortOrderType) || 'DESC';

  // 프로젝트 내 총 장소 수 조회
  const { data: allStoresData } = useSuspenseStores(parseInt(projectId!), {
    page: INITIAL_PAGE,
    size: INITIAL_PAGE,
    sort_order: sortOrder,
  });

  // 검수 완료 장소 수 조회
  const { data: completedStoresData } = useSuspenseStores(
    parseInt(projectId!),
    {
      page: INITIAL_PAGE,
      size: INITIAL_PAGE,
      review_status: 2,
      sort_order: sortOrder,
    }
  );

  // 현재 탭 데이터
  const { data } = useSuspenseStores(parseInt(projectId!), {
    page: currentPage,
    size: PAGE_SIZE,
    review_status: STATUS_MAP[currentTab],
    sort_order: sortOrder,
  });

  // 탭에 표시할 장소 개수
  const storeTotal = allStoresData.page_info.total_pages;
  const storeCompleted = completedStoresData.page_info.total_pages;
  const reviewingCount = storeTotal - storeCompleted;

  const handleTabChange = (value: string) => {
    setCurrentTab(value as TabValue);
    setCurrentPage(INITIAL_PAGE); // 탭 변경 시 페이지 초기화
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortToggle = () => {
    const newSort = sortOrder === 'DESC' ? 'ASC' : 'DESC';
    setSearchParams(prev => {
      prev.set('sort', newSort);
      return prev;
    });
    setCurrentPage(INITIAL_PAGE); // 정렬 변경 시 페이지 초기화
  };

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

      <div
        className={css({
          display: 'flex',
          flex: 1,
          flexDir: 'column',
          width: 'full',
          padding: '1.5rem',
          bg: '#ffffff',
          borderRadius: 'xl',
          boxShadow: '0px 4px 24px 0px #0000000A',
        })}
      >
        <Tabs.Root
          defaultValue={TAB_VALUES.ALL}
          onValueChange={handleTabChange}
        >
          <Tabs.List>
            <Tabs.Trigger value={TAB_VALUES.ALL}>
              전체 {storeTotal}
            </Tabs.Trigger>
            <Tabs.Trigger value={TAB_VALUES.REVIEWING}>
              검수 대기 {reviewingCount}
            </Tabs.Trigger>
            <Tabs.Trigger value={TAB_VALUES.COMPLETED}>
              검수 완료 {storeCompleted}
            </Tabs.Trigger>
          </Tabs.List>
          {Object.values(TAB_VALUES).map(tab => (
            <Tabs.Content
              key={tab}
              value={tab}
              className={css({
                overflowX: 'auto',
              })}
            >
              <StoreListTable
                stores={data.stores}
                sortOrder={sortOrder}
                onSortToggle={handleSortToggle}
              />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>

      <Pagination
        totalItems={data.page_info.total_pages * PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
