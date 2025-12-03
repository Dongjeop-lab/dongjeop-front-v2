import { useEffect, useState } from 'react';
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

export const ProjectDetailView = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName || `프로젝트 ${projectId}`;

  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`/api/v1/projects/${projectId}/stores?page=${currentPage}&size=10`)
      .then(res => res.json())
      .then(data => {
        setStores(data.stores);
        setTotalPages(data.page_info.total_pages);
      });
  }, [projectId, currentPage]);

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
              <StoreListTable filteredStores={stores} />
            </Tabs.Content>
            <Tabs.Content value={TAB_VALUES.REVIEWING}>
              <StoreListTable filteredStores={stores} />
            </Tabs.Content>
            <Tabs.Content value={TAB_VALUES.COMPLETED}>
              <StoreListTable filteredStores={stores} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>

      <Pagination
        totalItems={totalPages * 10}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
