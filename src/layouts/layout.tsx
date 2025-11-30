import { Outlet } from 'react-router';

import { css } from 'styled-system/css';

import { Breadcrumb } from '@/components/breadcrumb';

/**
 * 메인 레이아웃
 * 모든 페이지에 공통으로 적용되는 레이아웃
 * - Breadcrumb 네비게이션
 * - Outlet으로 자식 페이지 렌더링
 */
export default function Layout() {
  return (
    <div
      className={css({
        minHeight: '100vh',
        backgroundColor: 'gray.50',
      })}
    >
      {/* 네비게이션 바 */}
      <header
        className={css({
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        })}
      >
        <div
          className={css({
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 4',
          })}
        >
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              height: '64px',
            })}
          >
            <h1
              className={css({
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'button.primary',
              })}
            >
              동접 LAB
            </h1>
          </div>
          <Breadcrumb />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main
        className={css({
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '6 4',
        })}
      >
        <Outlet />
      </main>
    </div>
  );
}

