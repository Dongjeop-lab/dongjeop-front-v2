import { useSuspenseApiQuery } from '@/lib/query-hooks';

import { getStores } from '../_apis/store';
import { storeKeys } from '../_queries/store';
import type { UseStoresParams } from '../_types/params';

/**
 * 상태별 검수 목록 조회 (Suspense)
 */
export const useSuspenseStores = (
  projectId: number,
  params?: UseStoresParams
) => {
  return useSuspenseApiQuery({
    queryKey: storeKeys.list(projectId, params),
    queryFn: () => getStores(projectId, params),
  });
};
