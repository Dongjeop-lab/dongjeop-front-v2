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
          breadcrumb: (
            match: {
              params: { projectId: string };
              location: {
                state?: { projectName?: string };
                search: string;
              };
            },
            location: { search: string; state?: { projectName?: string } }
          ) => {
            // Link의 state 또는 localStorage에서 프로젝트 이름 가져오기
            const projectName =
              location.state?.projectName ||
              localStorage.getItem(`project_${match.params.projectId}_name`) ||
              `프로젝트 ${match.params.projectId}`;

            const searchParams = new URLSearchParams(location.search);
            const hasStore = searchParams.has('store');

            // ?store가 있으면 "장소 검수" 추가
            if (hasStore) {
              return [
                { label: '프로젝트 목록', path: '/' },
                {
                  label: projectName,
                  path: `/project/${match.params.projectId}`,
                },
                { label: '장소 검수' },
              ];
            }

            // ?store가 없으면 프로젝트 이름만
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
