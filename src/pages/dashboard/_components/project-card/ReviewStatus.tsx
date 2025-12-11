import { css } from 'styled-system/css';

interface ReviewStatusProps {
  reviewingStoreTotalCount: number;
  reviewingStoreCompletedCount: number;
  totalImageCount: number;
}

export const ReviewStatus = ({
  reviewingStoreTotalCount,
  reviewingStoreCompletedCount,
  totalImageCount,
}: ReviewStatusProps) => {
  const percentage = Math.round(
    (reviewingStoreCompletedCount / reviewingStoreTotalCount) * 100
  );
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const halfCircumference = circumference / 2;
  const progressLength = (percentage / 100) * halfCircumference;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '0.75rem',
        overflow: 'hidden',
        position: 'relative',
      })}
    >
      <div
        className={css({
          position: 'relative',
          width: '168px',
          height: '94px',
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
              fontSize: '12.5px',
              fontWeight: 'medium',
              color: 'text.dashboard.sub',
            })}
          >
            진행률
          </span>
          <span
            className={css({
              fontSize: '30px',
              fontWeight: 'bold',
              color: 'text.dashboard.secondary',
              lineHeight: '1',
              marginBottom: '7px',
            })}
          >
            {percentage}%
          </span>
        </div>
      </div>
      <span
        className={css({
          padding: '0.25rem 0.75rem',
          fontSize: '12.51px',
          fontWeight: 'medium',
          color: 'text.dashboard.sub',
          background: '#F2F4F8',
          borderRadius: 'full',
        })}
      >
        장소 {reviewingStoreTotalCount}개 · 이미지 {totalImageCount}장
      </span>
    </div>
  );
};
