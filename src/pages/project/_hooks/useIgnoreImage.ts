import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ignoreImage } from '../_apis/store';
import { storeKeys } from '../_queries/store';

/**
 * 이미지 무시 처리
 */
export const useIgnoreImage = (storeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: number) => ignoreImage(imageId),
    onSuccess: () => {
      // 해당 상점 상세 정보 무효화 (이미지 목록 갱신)
      queryClient.invalidateQueries({
        queryKey: storeKeys.detail(storeId),
      });
    },
  });
};

