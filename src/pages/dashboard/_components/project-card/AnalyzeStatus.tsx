import { css } from 'styled-system/css';

import { Progress } from '@/components/progress';

interface AnalyzeStatusProps {
  aiAnalyzingProgress: number;
  aiAnalyzingDuration: number;
}

export const AnalyzeStatus = ({
  aiAnalyzingDuration,
  aiAnalyzingProgress,
}: AnalyzeStatusProps) => {
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
            {aiAnalyzingProgress}%
          </span>
          <span
            className={css({
              fontSize: '0.75rem',
              fontWeight: 'medium',
              color: '#4E5968',
              paddingBottom: '0.28125rem',
            })}
          >
            {aiAnalyzingDuration}분 예정
          </span>
        </div>
        <div
          className={css({
            paddingBottom: '0.28125rem',
          })}
        >
          <Progress
            value={aiAnalyzingProgress}
            width='120px'
            height='8px'
          />
        </div>
      </div>
    </div>
  );
};
