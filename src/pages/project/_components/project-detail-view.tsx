import { Link, useLocation, useParams } from 'react-router';
import { css } from 'styled-system/css';

/**
 * 프로젝트 상세 화면 (임시)
 *
 * TODO: 다른 팀원이 구현할 예정
 * 현재는 장소 검수 페이지로 이동하는 링크만 제공
 */
export const ProjectDetailView = () => {
  const { projectId } = useParams();
  const location = useLocation();

  // 대시보드에서 전달받은 프로젝트 이름
  const projectName = location.state?.projectName || `프로젝트 ${projectId}`;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: '24px',
      })}
    >
      <div
        className={css({
          textAlign: 'center',
        })}
      >
        <h1
          className={css({
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '16px',
          })}
        >
          프로젝트 상세 페이지
        </h1>
        <p
          className={css({
            fontSize: '18px',
            color: '#6B7280',
            marginBottom: '8px',
          })}
        >
          프로젝트 ID: {projectId}
        </p>
        <p
          className={css({
            fontSize: '14px',
            color: '#9CA3AF',
          })}
        >
          이 페이지는 다른 팀원이 구현할 예정입니다.
        </p>
      </div>

      {/* 임시 링크: 장소 검수 페이지로 이동 */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
        })}
      >
        <h2
          className={css({
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px',
          })}
        >
          테스트용 링크
        </h2>
        <Link
          to={`/project/${projectId}?store=1`}
          state={{ projectName }} // 프로젝트 이름 전달
          className={css({
            padding: '12px 24px',
            backgroundColor: '#3182F7',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            transition: 'all 0.2s',
            _hover: {
              backgroundColor: '#1462D3',
            },
          })}
        >
          장소 검수 페이지로 이동 (store=1)
        </Link>
        <Link
          to={`/project/${projectId}?store=2`}
          state={{ projectName }} // 프로젝트 이름 전달
          className={css({
            padding: '12px 24px',
            backgroundColor: '#10B981',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            transition: 'all 0.2s',
            _hover: {
              backgroundColor: '#059669',
            },
          })}
        >
          장소 검수 페이지로 이동 (store=2)
        </Link>
        <Link
          to={`/project/${projectId}?store=3`}
          state={{ projectName }} // 프로젝트 이름 전달
          className={css({
            padding: '12px 24px',
            backgroundColor: '#6B7280',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            transition: 'all 0.2s',
            _hover: {
              backgroundColor: '#4B5563',
            },
          })}
        >
          장소 검수 페이지로 이동 (store=3)
        </Link>
      </div>
    </div>
  );
};
