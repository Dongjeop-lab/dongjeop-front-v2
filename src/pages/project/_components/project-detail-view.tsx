import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { css } from 'styled-system/css';

import Pagination from '@/components/pagination';
import Tabs from '@/components/tabs';

import type { StoreResponse, StoreReviewStatusType } from '../_types/store';
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

const STATUS_MAP: Record<string, StoreReviewStatusType | 0> = {
  [TAB_VALUES.ALL]: 0, // 전체 (필터 없음)
  [TAB_VALUES.REVIEWING]: 1, // 검수 대기
  [TAB_VALUES.COMPLETED]: 2, // 검수 완료
} as const;

export const ProjectDetailView = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName || `프로젝트 ${projectId}`;

  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [currentTab, setCurrentTab] = useState<TabValue>(TAB_VALUES.ALL);

  useEffect(() => {
    const reviewStatus =
      STATUS_MAP[currentTab] === 0
        ? ''
        : `&review_status=${STATUS_MAP[currentTab]}`;

    fetch(
      `/api/v1/projects/${projectId}/stores?page=${currentPage}&size=10${reviewStatus}`
    )
      .then(res => res.json())
      .then(data => {
        setStores(data.stores);
        setTotalPages(data.page_info.total_pages);
      });
  }, [projectId, currentPage, currentTab]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as TabValue);
    setCurrentPage(1); // 탭 변경 시 페이지 초기화
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
            {/* TODO: 실제 장소 수로 대체 */}
            <Tabs.Trigger value={TAB_VALUES.ALL}>전체 46</Tabs.Trigger>
            {/* TODO: 실제 검수 대기 장소 수로 대체 */}
            <Tabs.Trigger value={TAB_VALUES.REVIEWING}>
              검수 대기 16
            </Tabs.Trigger>
            {/* TODO: 실제 검수 완료 장소 수로 대체 */}
            <Tabs.Trigger value={TAB_VALUES.COMPLETED}>
              검수 완료 30
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
              <StoreListTable stores={stores} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>

      <Pagination
        totalItems={totalPages * 10}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
