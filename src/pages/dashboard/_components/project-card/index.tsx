import { useNavigate } from 'react-router';
import { css } from 'styled-system/css';

import Badge from '@/components/badge';
import type { Project } from '@/types/project';

import { Card } from '../card';
import { AnalyzeStatus } from './AnalyzeStatus';
import { ReviewStatus } from './ReviewStatus';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formatStatus = (status: Project['status']) => {
    switch (status) {
      case 'ANALYZING':
        return '분석중';
      case 'REVIEWING':
        return '검수중';
      case 'COMPLETED':
        return '검수완료';
    }
  };

  const renderProjectStatus = () => {
    if (project.status === 'ANALYZING') {
      const { ai_analyzing_progress, ai_analyzing_duration } =
        project.progress_info;

      return (
        <AnalyzeStatus
          aiAnalyzingProgress={ai_analyzing_progress}
          aiAnalyzingDuration={ai_analyzing_duration}
        />
      );
    }

    if (project.status === 'REVIEWING' || project.status === 'COMPLETED') {
      const { eviewing_store_total_count, reviewing_store_completed_count } =
        project.progress_info;

      return (
        <ReviewStatus
          reviewingStoreTotalCount={eviewing_store_total_count}
          reviewingStoreCompletedCount={reviewing_store_completed_count}
        />
      );
    }

    return null;
  };

  return (
    <Card
      as='button'
      className={css({
        width: '386px',
        height: '302px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      })}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Badge
            variant={
              project.status === 'COMPLETED'
                ? 'gray'
                : project.status === 'REVIEWING'
                  ? 'primary'
                  : 'blue'
            }
            label={formatStatus(project.status)}
          />
          <span
            className={css({
              fontSize: '0.875rem',
              fontWeight: 'medium',
              color: 'text.dashboard.sub',
            })}
          >
            {formatDate(project.created_at)}
          </span>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.125rem',
          })}
        >
          {/* TODO: Hover시 수정 Input으로 변경할 수 있음 */}
          <p
            className={css({
              padding: '0.125rem 0.375rem',
              color: 'text.dashboard.sub',
              fontSize: '0.875rem',
              fontWeight: 'medium',
            })}
          >
            {project.reviewer}
          </p>
          <h2
            className={css({
              padding: '0.125rem 0.375rem',
              color: 'text.dashboard.secondary',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            })}
          >
            {project.name}
          </h2>
        </div>
        {renderProjectStatus()}
      </div>

      <hr
        className={css({
          width: '100%',
          height: '1.2px',
          color: '#E7EDF3',
        })}
      />

      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.75rem',
          color: 'text.dashboard.sub',
        })}
      >
        <img
          src='/icons/file.svg'
          alt=''
          width={14}
          height={14}
        />
        {project.csv_file_name}
      </div>
    </Card>
  );
};
