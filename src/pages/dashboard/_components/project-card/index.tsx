import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { css } from 'styled-system/css';

import Badge from '@/components/badge';
import { PROJECT_STATUS } from '@/constants/project';
import { useClickOutside } from '@/hooks/use-click-outside';
import type { Project } from '@/types/project';

import { Card } from '../card';
import { AnalyzeStatus } from './AnalyzeStatus';
import { ReviewStatus } from './ReviewStatus';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  // TODO: API 연동 후 삭제
  const [name, setName] = useState(project.name);
  const [reviewer, setReviewer] = useState(project.reviewer);

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(project.name);
  const [tempReviewer, setTempReviewer] = useState(project.reviewer);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    setName(tempName);
    setReviewer(tempReviewer);
    setIsEditing(false);
  };

  useClickOutside(containerRef, () => {
    if (isEditing) {
      handleSave();
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === ' ') {
      e.stopPropagation();
    }
  };

  const startEditing = () => {
    setTempName(name);
    setTempReviewer(reviewer);
    setIsEditing(true);
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
        <div
          ref={containerRef}
          onClick={e => {
            e.stopPropagation();
            if (!isEditing) startEditing();
          }}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.125rem',
            cursor: 'pointer',
            '&:hover > *': {
              backgroundColor: !isEditing ? 'gray.100' : undefined,
            },
          })}
        >
          {isEditing ? (
            <>
              <input
                value={tempReviewer}
                onChange={e => setTempReviewer(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={e => e.stopPropagation()}
                placeholder='검수자 입력'
                className={css({
                  padding: '0.125rem 0.375rem',
                  color: 'text.dashboard.sub',
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                  width: '100%',
                  outline: 'none',
                  backgroundColor: 'gray.100',
                  borderRadius: '4px',
                })}
              />
              <input
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={e => e.stopPropagation()}
                placeholder='프로젝트 이름 입력'
                autoFocus
                className={css({
                  padding: '0.125rem 0.375rem',
                  color: 'text.dashboard.secondary',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  width: '100%',
                  outline: 'none',
                  backgroundColor: 'gray.100',
                  borderRadius: '4px',
                })}
              />
            </>
          ) : (
            <>
              <p
                className={css({
                  padding: '0.125rem 0.375rem',
                  color: 'text.dashboard.sub',
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                })}
              >
                {reviewer || '검수자 입력'}
              </p>
              <h2
                className={css({
                  padding: '0.125rem 0.375rem',
                  color: 'text.dashboard.secondary',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                })}
              >
                {name || '프로젝트 이름 입력'}
              </h2>
            </>
          )}
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
