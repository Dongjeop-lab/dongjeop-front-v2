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
            match: {
              params: { projectId: string };
              location: { state?: { projectName?: string }; search: string };
            },
            location: { search: string; state?: { projectName?: string } }
          ) => {
            // Link의 state에서 프로젝트 이름 가져오기
            // 없으면 projectId를 fallback으로 사용
            const projectName =
              location.state?.projectName || match.params.projectId;

            const searchParams = new URLSearchParams(location.search);
            const hasStore = searchParams.has('store');

            if (hasStore) {
              return [
                { label: '프로젝트 목록', path: '/' },
                {
                  label: projectName, // 프로젝트 이름 표시
                  path: `/project/${match.params.projectId}`,
                },
                { label: '장소 검수' },
              ];
            }

            return [
              { label: '프로젝트 목록', path: '/' },
              { label: projectName },
            ];
          },
        },
      },
    ],
  },
]);
