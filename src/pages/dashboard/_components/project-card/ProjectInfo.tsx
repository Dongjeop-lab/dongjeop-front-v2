import { useRef, useState } from 'react';
import { css } from 'styled-system/css';

import { useClickOutside } from '@/hooks/use-click-outside';

interface ProjectInfoProps {
  initialName: string;
  initialReviewer: string;
  onUpdate: (name: string, reviewer: string) => void;
}

export const ProjectInfo = ({
  initialName,
  initialReviewer,
  onUpdate,
}: ProjectInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(initialName);
  const [tempReviewer, setTempReviewer] = useState(initialReviewer);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onUpdate(tempName, tempReviewer);
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
    setTempName(initialName);
    setTempReviewer(initialReviewer);
    setIsEditing(true);
  };

  return (
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
            {initialReviewer || '검수자 입력'}
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
            {initialName || '프로젝트 이름 입력'}
          </h2>
        </>
      )}
    </div>
  );
};
