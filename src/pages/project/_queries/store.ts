import type { UseStoresParams } from '../_types/params';

/**
 * Store Review Query Keys
 */
export const storeKeys = {
  all: ['stores'] as const,
  lists: () => [...storeKeys.all, 'list'] as const,
  list: (projectId: number, filters?: UseStoresParams) =>
    [...storeKeys.lists(), { projectId, ...filters }] as const,
  simple: (projectId: number) =>
    [...storeKeys.all, 'simple', { projectId }] as const,
  details: () => [...storeKeys.all, 'detail'] as const,
  detail: (storeId: number) => [...storeKeys.details(), storeId] as const,
};
