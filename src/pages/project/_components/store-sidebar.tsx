import { css } from 'styled-system/css';

import StoreListIcon from '@/assets/store-list.svg';
import Badge from '@/components/badge';

import type { StoreSimpleResponse } from '../_types/store';

interface StoreSidebarProps {
  stores: StoreSimpleResponse[];
  selectedStoreId: number | null;
  onSelectStore: (storeId: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

/**
 * 상점 목록 사이드바 (접기 가능)
 * Figma 디자인 기반
 */
export const StoreSidebar = ({
  stores,
  selectedStoreId,
  onSelectStore,
  isCollapsed,
  onToggleCollapse,
}: StoreSidebarProps) => {
  const totalCount = stores.length;

  return (
    <aside
      className={css({
        position: 'relative',
        width: isCollapsed ? '40px' : '277px',
        height: 'full',
        backgroundColor: isCollapsed ? 'transparent' : 'white',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: isCollapsed ? 'none' : '0px 4px 24px 0px #0000000A',
        borderRadius: isCollapsed ? '0' : '12px',
      })}
    >
      {/* 상점 목록 */}
      {!isCollapsed && (
        <div
          className={css({
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          {/* 헤더 */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px',
              flexShrink: 0,
            })}
          >
            <h2
              className={css({
                fontSize: '1.25rem',
                fontWeight: 'medium',
                lineHeight: '140%',
                color: 'text.dashboard.secondary',
              })}
            >
              총 {totalCount}개 장소
            </h2>
            <button
              onClick={onToggleCollapse}
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 10px',
                cursor: 'pointer',
                _hover: {
                  opacity: 0.7,
                },
              })}
            >
              <img
                src={StoreListIcon}
                alt='접기'
                width={19}
                height={16}
              />
            </button>
          </div>

          {/* 상점 카드 목록 */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              padding: '0 24px 24px',
              gap: '16px',
              flex: 1,
              overflowY: 'auto',
            })}
          >
            {stores.map(store => (
              <button
                key={store.id}
                onClick={() => onSelectStore(store.id)}
                className={css({
                  padding: '12px 15px',
                  textAlign: 'left',
                  backgroundColor:
                    selectedStoreId === store.id ? '#E8F6FF' : '#F7F9FB',
                  border: '2px solid',
                  borderColor:
                    selectedStoreId === store.id
                      ? 'button.primary'
                      : 'transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    borderColor: 'button.primary',
                  },
                })}
              >
                {/* 상태 뱃지 */}
                {store.status === 1 && (
                  <Badge
                    variant='blue'
                    label='검수대기'
                  />
                )}
                {store.status === 2 && (
                  <Badge
                    variant='gray'
                    label='검수완료'
                  />
                )}

                {/* 상점명 */}
                <div
                  className={css({
                    fontSize: '0.875rem',
                    fontWeight: 'medium',
                    color: 'text.base',
                    marginBottom: '2px',
                    marginTop: '16px',
                  })}
                >
                  {store.name}
                </div>

                {/* 주소 */}
                <div
                  className={css({
                    fontSize: '0.75rem',
                    fontWeight: 'regular',
                    color: 'text.sub',
                    lineHeight: '140%',
                  })}
                >
                  {store.address}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 접힌 상태 - 아이콘만 표시 */}
      {isCollapsed && (
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingY: '19px',
          })}
        >
          <button
            onClick={onToggleCollapse}
            className={css({
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0px 4px 24px 0px #0000000A',
              _hover: {
                backgroundColor: '#F9FAFB',
              },
            })}
          >
            <img
              src={StoreListIcon}
              alt='상점 목록'
              width={19}
              height={16}
            />
          </button>
        </div>
      )}
    </aside>
  );
};
