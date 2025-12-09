import { useNavigate } from 'react-router';
import { css } from 'styled-system/css';

import Badge from '@/components/badge';
import { PROJECT_STATUS } from '@/constants/project';
import type { Project } from '@/pages/dashboard/_types/project';

import { useUpdateProjectInfo } from '../../_hooks/useUpdateProjectInfo';
import { Card } from '../card';
import { AnalyzeStatus } from './AnalyzeStatus';
import { ProjectInfo } from './ProjectInfo';
import { ReviewStatus } from './ReviewStatus';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const { mutate } = useUpdateProjectInfo();

  const handleUpdateInfo = (newName: string, newReviewer: string) => {
    mutate({
      projectId: project.id,
      body: {
        name: newName,
        reviewer: newReviewer,
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formatStatus = (status: Project['status']) => {
    switch (status) {
      case PROJECT_STATUS.ANALYZING:
        return '분석중';
      case PROJECT_STATUS.REVIEWING:
        return '검수중';
      case PROJECT_STATUS.COMPLETED:
        return '검수완료';
    }
  };

  const renderProjectStatus = () => {
    if (project.status === PROJECT_STATUS.ANALYZING) {
      const {
        images_total_count,
        images_finished_count,
        ai_analyzing_duration,
      } = project.progress_info;

      const aiAnalyzingProgress = Math.round(
        (images_finished_count / images_total_count) * 100
      );

      return (
        <AnalyzeStatus
          aiAnalyzingProgress={aiAnalyzingProgress}
          aiAnalyzingDuration={ai_analyzing_duration}
        />
      );
    }

    if (
      project.status === PROJECT_STATUS.REVIEWING ||
      project.status === PROJECT_STATUS.COMPLETED
    ) {
      const { stores_total_count, stores_completed_count } =
        project.progress_info;

      return (
        <ReviewStatus
          reviewingStoreTotalCount={stores_total_count}
          reviewingStoreCompletedCount={stores_completed_count}
        />
      );
    }

    return null;
  };

  return (
    <Card
      as='div'
      className={css({
        width: '386px',
        height: '302px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        cursor: 'pointer',
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
        <ProjectInfo
          initialName={project.name}
          initialReviewer={project.reviewer}
          onUpdate={handleUpdateInfo}
        />
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
