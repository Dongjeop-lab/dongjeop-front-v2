import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createOrUpdateStoreLabel } from '../_apis/store';
import { storeKeys } from '../_queries/store';
import type { StoreReviewLabelRequest } from '../_types/store';

/**
 * 상점 검수 라벨 등록/수정
 */
export const useCreateOrUpdateStoreLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storeId,
      data,
    }: {
      storeId: number;
      data: StoreReviewLabelRequest;
    }) => createOrUpdateStoreLabel(storeId, data),
    onSuccess: (_, variables) => {
      // 해당 상점 상세 정보 무효화
      queryClient.invalidateQueries({
        queryKey: storeKeys.detail(variables.storeId),
      });
      // 모든 상점 목록 무효화
      queryClient.invalidateQueries({ queryKey: storeKeys.lists() });
    },
  });
};
