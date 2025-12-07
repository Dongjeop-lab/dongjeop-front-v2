import { css } from 'styled-system/css';

/**
 * 검수할 상점이 없을 때 표시되는 빈 화면
 */
export const EmptyStoreMessage = () => {
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
        검수할 상점이 없습니다.
      </p>
    </div>
  );
};
