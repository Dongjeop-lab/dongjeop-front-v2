import { createBrowserRouter } from 'react-router';

/**
 * 라우터 설정
 * 레이아웃 + 페이지 구조
 */
export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: Component } = await import('@/layouts/layout');
      return { Component };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import('@/pages/dashboard');
          return { Component };
        },
        handle: {
          breadcrumb: () => ({ label: '프로젝트 목록', path: '/' }),
        },
      },
      {
        path: 'project/:projectId',
        lazy: async () => {
          const { default: Component } = await import('@/pages/project');
          return { Component };
        },
        handle: {
          breadcrumb: (match: { params: { projectId: string } }) => ({
            label: match.params.projectId,
          }),
        },
      },
    ],
  },
]);
