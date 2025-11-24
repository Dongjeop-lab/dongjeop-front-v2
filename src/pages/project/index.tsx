import { useParams, useSearchParams } from 'react-router';

/**
 * 레이블링 사진 검수 페이지
 * Path: /:projectName
 * Query Params: store, image
 */
const ProjectPage = () => {
  const { projectName } = useParams();
  const [searchParams] = useSearchParams();

  const store = searchParams.get('store');
  const image = searchParams.get('image');

  return (
    <div>
      <h1>레이블링 사진 검수</h1>
      <p>프로젝트: {projectName}</p>
      {store && <p>Store: {store}</p>}
      {image && <p>Image: {image}</p>}
      {/* TODO: 레이블링 사진 검수 기능 구현 */}
    </div>
  );
};

export default ProjectPage;
