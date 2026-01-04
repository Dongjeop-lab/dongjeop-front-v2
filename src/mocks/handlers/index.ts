import { http, HttpResponse } from 'msw';

import { dashboardHandlers } from './dashboard';
import { projectHandlers } from './project';

/**
 * 모든 MSW 핸들러 통합
 */
export const handlers = [
  // 외부 이미지 CDN 요청 차단 (콘솔 에러 방지)
  http.get('https://via.placeholder.com/*', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  ...dashboardHandlers,
  ...projectHandlers,
];
