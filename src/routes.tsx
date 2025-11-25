import { createBrowserRouter } from 'react-router';

/**
 * 라우터 설정
 * createBrowserRouter를 사용한 최적화된 라우팅 구조
 * lazy()를 사용하여 각 라우트별 코드 스플리팅
 */
export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: Component } = await import('@/pages/dashboard');
      return { Component };
    },
  },
  {
    path: '/:projectName',
    lazy: async () => {
      const { default: Component } = await import('@/pages/project');
      return { Component };
    },
  },
  {
    path: '/:projectName/completed',
    lazy: async () => {
      const { default: Component } = await import('@/pages/project/completed');
      return { Component };
    },
  },
]);
