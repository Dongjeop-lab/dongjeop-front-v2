import { dashboardHandlers } from './dashboard';
import { projectHandlers } from './project';

/**
 * 모든 MSW 핸들러 통합
 */
export const handlers = [...dashboardHandlers, ...projectHandlers];
