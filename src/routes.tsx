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
          breadcrumb: () => ({ label: '프로젝트 목록' }),
        },
      },
      {
        path: 'project/:projectId',
        lazy: async () => {
          const { default: Component } = await import('@/pages/project');
          return { Component };
        },
        handle: {
          breadcrumb: (
            match: { params: { projectId: string } },
            location: { search: string }
          ) => {
            // URL에서 store 파라미터 확인
            const searchParams = new URLSearchParams(location.search);
            const hasStore = searchParams.has('store');

            // store가 있으면 "장소 검수"까지 표시
            if (hasStore) {
              return [
                { label: '프로젝트 목록', path: '/' },
                {
                  label: match.params.projectId,
                  path: `/project/${match.params.projectId}`,
                },
                { label: '장소 검수' },
              ];
            }

            // store가 없으면 프로젝트 이름만
            return [
              { label: '프로젝트 목록', path: '/' },
              { label: match.params.projectId },
            ];
          },
        },
      },
    ],
  },
]);
