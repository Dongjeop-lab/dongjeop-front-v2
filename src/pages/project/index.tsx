import { useParams, useSearchParams } from 'react-router';

/**
 * 프로젝트 페이지 (레이블링 - 식당 검수)
 * Path: /project/{project-id}
 * Query Params: store (optional)
 */
export default function ProjectPage() {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();

  const store = searchParams.get('store');

  return (
    <div>
      <h1>레이블링 - 식당 검수</h1>
      <p>프로젝트 ID: {projectId}</p>
      {store && <p>식당: {store}</p>}
      {/* TODO: 식당 검수 기능 구현 */}
    </div>
  );
}
