import { setupServer } from 'msw/node';

import { handlers } from './handlers';

/**
 * MSW 서버 설정
 * 테스트 환경에서 API 모킹을 위해 사용
 */
export const server = setupServer(...handlers);
