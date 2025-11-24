import { useParams, useSearchParams } from 'react-router';

/**
 * 검수완료 목록 페이지
 * Path: /:projectName/completed
 * Query Params: filter (optional)
 */
const CompletedPage = () => {
  const { projectName } = useParams();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get('filter');

  return (
    <div>
      <h1>검수완료 목록</h1>
      <p>프로젝트: {projectName}</p>
      {filter && <p>필터: {filter}</p>}
      {/* TODO: 검수완료 목록 구현 */}
    </div>
  );
};

export default CompletedPage;
