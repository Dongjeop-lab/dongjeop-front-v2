import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

/**
 * MSW 브라우저 워커 설정
 * 개발 환경에서 API 모킹을 위해 사용
 */
export const worker = setupWorker(...handlers);
