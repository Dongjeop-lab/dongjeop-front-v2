import { useState } from 'react';
import { css } from 'styled-system/css';

import { CreateProjectModal } from './create-project-modal';

export const CreateProjectButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={css({
          width: '246px',
          height: '302px',
          padding: '2rem',
          backgroundColor: 'white',
          border: '1px solid #6B728012',
          borderRadius: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          _hover: {
            border: '1px solid #6B728040',
          },
        })}
        onClick={() => setOpen(true)}
      >
        <img
          src='/icons/plus-fill.svg'
          alt=''
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
          })}
        >
          <span
            className={css({
              fontSize: '1.25rem',
              fontWeight: 'bold',
            })}
          >
            CSV 업로드
          </span>
          <span>새 프로젝트를 추가해보세요</span>
        </div>
      </button>
      <CreateProjectModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};
