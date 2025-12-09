import { useParams } from 'react-router';

import { useSuspenseStoresSimple } from '../_hooks';
import { EmptyStoreMessage } from './empty-store-message';
import { StoreReviewContent } from './store-review-content';

/**
 * 장소 검수 화면
 * Path: /project/{project-id}?store={store-id}
 */
export const StoreReviewView = () => {
  const { projectId } = useParams();

  // 상점 목록 조회
  const { data: storesData } = useSuspenseStoresSimple({
    projectId: parseInt(projectId!),
  });

  // 상점이 없으면 빈 화면 표시
  if (!storesData?.stores?.length) {
    return <EmptyStoreMessage />;
  }

  return <StoreReviewContent stores={storesData.stores} />;
};
