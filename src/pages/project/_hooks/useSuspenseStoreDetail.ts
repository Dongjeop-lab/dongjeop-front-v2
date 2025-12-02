import { useSuspenseApiQuery } from '@/lib/query-hooks';

import { getStoreDetail } from '../_apis/store';
import { storeKeys } from '../_queries/store';
import type { UseStoreDetailParams } from '../_types/params';

/**
 * 검수 화면 상점 상세 정보 조회 (Suspense)
 */
export const useSuspenseStoreDetail = ({ storeId }: UseStoreDetailParams) => {
  return useSuspenseApiQuery({
    queryKey: storeKeys.detail(storeId),
    queryFn: () => getStoreDetail(storeId),
  });
};
