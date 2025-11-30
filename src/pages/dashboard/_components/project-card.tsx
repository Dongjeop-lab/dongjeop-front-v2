import { css } from 'styled-system/css';

import Badge from '@/components/badge';
import { Progress } from '@/components/progress';
import type { Project } from '@/types/project';

import { Card } from './card';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
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
        <div
          className={css({
            height: '94px',
            padding: '0.75rem',
            paddingBottom: '0.9375rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9375rem',
            backgroundColor: '#F7F9FB',
            borderRadius: '0.75rem',
          })}
        >
          <h3
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            })}
          >
            <img
              src='/icons/ai-notice.svg'
              alt=''
            />
            <span
              className={css({
                fontSize: '0.75rem',
                fontWeight: 'medium',
                color: '#7E8390',
              })}
            >
              AI가 접근성을 분석중이에요
            </span>
          </h3>
          <div
            className={css({
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'flex-end',
                gap: '0.5rem',
              })}
            >
              <span
                className={css({
                  fontSize: '1.875rem',
                  fontWeight: 'bold',
                  color: '#374151',
                  lineHeight: '116.2%',
                })}
              >
                {ai_analyzing_progress}%
              </span>
              <span
                className={css({
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                  color: '#4E5968',
                  paddingBottom: '4.5px',
                })}
              >
                {ai_analyzing_duration}분 예정
              </span>
            </div>
            <div
              className={css({
                paddingBottom: '4.5px',
              })}
            >
              <Progress
                value={ai_analyzing_progress}
                width='120px'
                height='8px'
              />
            </div>
          </div>
        </div>
      );
    }

    if (project.status === 'REVIEWING' || project.status === 'COMPLETED') {
      const { eviewing_store_total_count, reviewing_store_completed_count } =
        project.progress_info;

      const percentage = Math.round(
        (reviewing_store_completed_count / eviewing_store_total_count) * 100
      );
      const radius = 76;
      const circumference = 2 * Math.PI * radius;
      const halfCircumference = circumference / 2;
      const progressLength = (percentage / 100) * halfCircumference;

      return (
        <div
          className={css({
            height: '94px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          })}
        >
          <div
            className={css({
              position: 'relative',
              width: '168px',
              height: '84px',
              display: 'flex',
              justifyContent: 'center',
            })}
          >
            <svg
              width='168'
              height='84'
              viewBox='0 0 168 84'
            >
              <circle
                cx='84'
                cy='84'
                r={radius}
                fill='none'
                stroke='#E5E7EB'
                strokeWidth='16'
                strokeDasharray={`${halfCircumference} ${circumference}`}
                strokeLinecap='round'
                transform='rotate(180 84 84)'
              />
              <circle
                cx='84'
                cy='84'
                r={radius}
                fill='none'
                stroke='#3B82F6'
                strokeWidth='16'
                strokeDasharray={`${progressLength} ${circumference}`}
                strokeLinecap='round'
                transform='rotate(180 84 84)'
              />
            </svg>
            <div
              className={css({
                position: 'absolute',
                bottom: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: '0px',
                height: '100%',
              })}
            >
              <span
                className={css({
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: '#374151',
                  lineHeight: '1',
                  marginBottom: '2px',
                })}
              >
                {percentage}%
              </span>
              <span
                className={css({
                  fontSize: '12.5px',
                  fontWeight: 'medium',
                  color: '#6B7280',
                })}
              >
                {reviewing_store_completed_count} /{eviewing_store_total_count}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={css({
          width: '100%',
          height: '94px',
        })}
      ></div>
    );
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
