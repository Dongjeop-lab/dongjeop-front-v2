import { useState } from 'react';
import { css } from 'styled-system/css';

import { Card } from './card';
import { CreateProjectModal } from './create-project-modal';

export const CreateProjectButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        as='button'
        className={css({
          width: '246px',
          height: '302px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
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
      </Card>
      <CreateProjectModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};
