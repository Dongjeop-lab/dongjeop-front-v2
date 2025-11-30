import { Outlet } from 'react-router';
import { css } from 'styled-system/css';

import { Breadcrumb } from '@/components/breadcrumb';

/**
 * 메인 레이아웃
 * Figma 디자인 기반
 */
export default function Layout() {
  return (
    <div
      className={css({
        minHeight: '100vh',
        backgroundColor: '#52565C',
      })}
    >
      {/* Breadcrumb 네비게이션 */}
      <Breadcrumb />

      {/* 메인 콘텐츠 배경 */}
      <div
        className={css({
          backgroundColor: '#F4F6F8',
          minHeight: 'calc(100vh - 70px)',
        })}
      >
        {/* 콘텐츠 영역 (중앙 정렬) */}
        <main
          className={css({
            maxWidth: '1440px',
            margin: '0 auto',
            paddingTop: '60px',
            paddingLeft: '120px',
            paddingRight: '120px',
            paddingBottom: '60px',
          })}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
