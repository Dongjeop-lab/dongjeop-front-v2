import { css } from 'styled-system/css';

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
        width: isCollapsed ? '60px' : '360px',
        height: 'calc(100vh - 70px)',
        backgroundColor: '#F9FAFB',
        borderRight: '1px solid #E5E7EB',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0,
      })}
    >
      {/* 접기/펼치기 버튼 */}
      <button
        onClick={onToggleCollapse}
        className={css({
          position: 'absolute',
          top: '20px',
          right: isCollapsed ? '10px' : '20px',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s',
          fontSize: '14px',
          _hover: {
            backgroundColor: '#F9FAFB',
          },
        })}
      >
        {isCollapsed ? '▶' : '◀'}
      </button>

      {/* 상점 목록 */}
      {!isCollapsed && (
        <div
          className={css({
            paddingTop: '24px',
            paddingX: '20px',
            height: '100%',
            overflowY: 'auto',
          })}
        >
          {/* 헤더 */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            })}
          >
            <h2
              className={css({
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
              })}
            >
              총 {totalCount}개 장소
            </h2>
            <button
              className={css({
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
                _hover: {
                  backgroundColor: '#F9FAFB',
                },
              })}
            >
              ☰
            </button>
          </div>

          {/* 상점 카드 목록 */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            {stores.map(store => (
              <button
                key={store.id}
                onClick={() => onSelectStore(store.id)}
                className={css({
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor:
                    selectedStoreId === store.id ? 'white' : 'white',
                  border: '2px solid',
                  borderColor:
                    selectedStoreId === store.id ? '#3182F7' : 'transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  _hover: {
                    borderColor:
                      selectedStoreId === store.id ? '#3182F7' : '#E5E7EB',
                  },
                })}
              >
                {/* 검수중 뱃지 */}
                {store.status === 1 && (
                  <div
                    className={css({
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      borderRadius: '4px',
                      backgroundColor: '#3182F7',
                      color: 'white',
                    })}
                  >
                    검수중
                  </div>
                )}

                {/* 검수완료 뱃지 */}
                {store.status === 2 && (
                  <div
                    className={css({
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      borderRadius: '4px',
                      backgroundColor: '#10B981',
                      color: 'white',
                    })}
                  >
                    검수완료
                  </div>
                )}

                {/* 상점명 */}
                <div
                  className={css({
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '8px',
                    paddingRight: '60px',
                  })}
                >
                  {store.name}
                </div>

                {/* 주소 */}
                <div
                  className={css({
                    fontSize: '14px',
                    color: '#6B7280',
                    lineHeight: '1.5',
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
            paddingTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          <div
            className={css({
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '20px',
            })}
          >
            ☰
          </div>
        </div>
      )}
    </aside>
  );
};
