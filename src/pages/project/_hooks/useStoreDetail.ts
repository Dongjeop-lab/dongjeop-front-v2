import { useApiQuery } from '@/lib/query-hooks';

import { getStoreDetail } from '../_apis/store';
import { storeKeys } from '../_queries/store';
import type { UseStoreDetailParams } from '../_types/params';

/**
 * 검수 화면 상점 상세 정보 조회
 */
export const useStoreDetail = ({ storeId }: UseStoreDetailParams) => {
  return useApiQuery({
    queryKey: storeKeys.detail(storeId),
    queryFn: () => getStoreDetail(storeId),
    enabled: !!storeId,
  });
};
