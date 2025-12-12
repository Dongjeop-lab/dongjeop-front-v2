import { useSearchParams } from 'react-router';

import { AsyncBoundary } from '@/components';

import { ProjectDetailView } from './_components/project-detail-view';
import { StoreReviewView } from './_components/store-review-view';

/**
 * 프로젝트 페이지
 * Path: /project/{project-id}
 *
 * Query Params에 따라 다른 화면 표시:
 * - ?store가 없으면 → 프로젝트 상세 화면 (장소 목록 화면, 전체 / 검수 대기 / 검수 완료)
 * - ?store가 있으면 → 장소 검수 화면
 */
const ProjectPage = () => {
  const [searchParams] = useSearchParams();
  const hasStore = searchParams.has('store');

  // ?store가 있으면 장소 검수 화면
  if (hasStore) {
    return (
      <AsyncBoundary>
        <StoreReviewView />
      </AsyncBoundary>
    );
  }

  // ?store가 없으면 프로젝트 상세 화면 (장소 검수 목록 화면)
  return (
    <AsyncBoundary>
      <ProjectDetailView />
    </AsyncBoundary>
  );
};

export default ProjectPage;
