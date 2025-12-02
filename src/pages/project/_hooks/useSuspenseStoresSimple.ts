import { useSuspenseApiQuery } from '@/lib/query-hooks';

import { getStoresSimple } from '../_apis/store';
import { storeKeys } from '../_queries/store';
import type { UseStoresSimpleParams } from '../_types/params';

/**
 * 검수 화면 상점 목록 조회 (간단 정보, Suspense)
 */
export const useSuspenseStoresSimple = ({
  projectId,
}: UseStoresSimpleParams) => {
  return useSuspenseApiQuery({
    queryKey: storeKeys.simple(projectId),
    queryFn: () => getStoresSimple(projectId),
  });
};
