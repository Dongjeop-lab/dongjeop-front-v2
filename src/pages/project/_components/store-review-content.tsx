import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { css } from 'styled-system/css';

import { useToast } from '@/hooks/use-toast';

import { useCreateOrUpdateStoreLabel, useStoreDetail } from '../_hooks';
import type {
  StoreReviewLabelRequest,
  StoreSimpleResponse,
} from '../_types/store';
import { StoreDetailPanel } from './store-detail-panel';
import { StoreSidebar } from './store-sidebar';

/**
 * 장소 검수 화면 내부 (상점 목록이 있을 때)
 */
export const StoreReviewContent = ({
  stores,
}: {
  stores: StoreSimpleResponse[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const queryClient = useQueryClient();
  const { openToast } = useToast();

  const storeIdFromQuery = searchParams.get('store');
  const selectedStoreId = storeIdFromQuery ? parseInt(storeIdFromQuery) : null;

  // 선택된 상점이 없으면 첫 번째 상점 자동 선택
  const firstStoreId = stores[0].id;
  const currentStoreId = selectedStoreId || firstStoreId;

  // 상점 상세 정보 조회
  const { data: storeDetail } = useStoreDetail({
    storeId: currentStoreId,
  });

  // 라벨 등록/수정
  const { mutate: submitLabel, isPending } = useCreateOrUpdateStoreLabel();

  const handleSelectStore = (storeId: number) => {
    setSearchParams({ store: storeId.toString() });
  };

  const handleSubmit = (data: StoreReviewLabelRequest) => {
    submitLabel(
      { storeId: currentStoreId, data },
      {
        onSuccess: () => {
          // 상점 목록 및 상세 정보 새로고침
          queryClient.invalidateQueries({ queryKey: ['stores'] });
          queryClient.invalidateQueries({
            queryKey: ['store', currentStoreId],
          });

          openToast('검수가 완료되었습니다!');
        },
      }
    );
  };

  // 상점 상세 정보 로딩 중
  if (!storeDetail) {
    return (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 70px)',
          backgroundColor: '#F4F6F8',
        })}
      >
        <p
          className={css({
            fontSize: '18px',
            color: '#6B7280',
          })}
        >
          로딩 중...
        </p>
      </div>
    );
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: '1.875rem',
        width: '100%',
        height: 'calc(100vh - 70px - 120px)',
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
        장소 검수
      </header>
      <div
        className={css({
          display: 'flex',
          flex: 1,
          width: 'full',
          gap: '1.875rem',
          overflow: 'hidden',
        })}
      >
        {/* 좌측 사이드바 */}
        <StoreSidebar
          stores={stores}
          selectedStoreId={currentStoreId}
          onSelectStore={handleSelectStore}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        {/* 우측 메인 영역 */}
        <StoreDetailPanel
          store={storeDetail}
          storeId={currentStoreId}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </div>
    </div>
  );
};
