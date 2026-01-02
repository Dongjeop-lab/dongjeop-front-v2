import { css } from 'styled-system/css';

import { Button } from '@/components/button';
import { Progress } from '@/components/progress';

interface UploadDefaultViewProps {
  onSelect: () => void;
}

export const UploadDefaultView = ({ onSelect }: UploadDefaultViewProps) => {
  return (
    <div
      className={css({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
      })}
    >
      <img
        src='/icons/upload.svg'
        alt=''
      />
      <span
        className={css({
          flex: 1,
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#374151',
        })}
      >
        검수할 CSV 파일을 드래그해서 선택해주세요
      </span>
      <Button
        size='sm'
        onClick={onSelect}
      >
        파일 선택
      </Button>
    </div>
  );
};

export const UploadDraggingView = () => {
  return (
    <div
      className={css({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.625rem',
      })}
    >
      <img
        src='/icons/upload-blue.svg'
        alt=''
      />
      <span
        className={css({
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#374151',
        })}
      >
        파일을 여기에 놓으세요
      </span>
    </div>
  );
};

interface UploadProgressViewProps {
  fileName: string | null;
  progress: number;
  onCancel: () => void;
}

export const UploadProgressView = ({
  fileName,
  progress,
  onCancel,
}: UploadProgressViewProps) => {
  return (
    <div
      className={css({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
      })}
    >
      <img
        src='/icons/file.svg'
        alt='file'
      />
      <div
        className={css({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.375rem',
        })}
      >
        <span
          className={css({
            maxWidth: '344px',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#374151',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '150%',
          })}
        >
          {fileName}
        </span>
        <Progress
          value={progress}
          width='200px'
          height='0.5rem'
        />
      </div>
      <button
        onClick={onCancel}
        className={css({
          flexShrink: 0,
          cursor: 'pointer',
          padding: '0.25rem',
          borderRadius: '0.25rem',
          '&:hover': {
            backgroundColor: '#F3F4F6',
          },
        })}
      >
        <img
          src='/icons/clear-fill.svg'
          alt='cancel'
        />
      </button>
    </div>
  );
};

interface UploadCompletedViewProps {
  fileName: string | null;
  onEdit: () => void;
}

export const UploadCompletedView = ({
  fileName,
  onEdit,
}: UploadCompletedViewProps) => {
  return (
    <div
      className={css({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.625rem',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          overflow: 'hidden',
        })}
      >
        <img
          src='/icons/file.svg'
          alt='file'
        />
        <span
          className={css({
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#374151',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          })}
        >
          {fileName}
        </span>
      </div>
      <Button
        variant='gray'
        size='sm'
        onClick={onEdit}
      >
        파일수정
      </Button>
    </div>
  );
};
