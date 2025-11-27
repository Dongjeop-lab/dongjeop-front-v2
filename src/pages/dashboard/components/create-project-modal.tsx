import { css } from 'styled-system/css';

import Modal from '@/components/modal';

import { CSVUploader } from './csv-uploader';
import { TextField } from './text-field';

const MAX_PROJECT_NAME_LENGTH = 15;
const MAX_PERSON_NAME_LENGTH = 15;

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProjectModal = ({
  open,
  onOpenChange,
}: CreateProjectModalProps) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title='새 프로젝트 만들기'
      width={500}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        })}
      >
        <CSVUploader />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          })}
        >
          <label
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            })}
          >
            <span
              className={css({
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
              })}
            >
              프로젝트 이름
            </span>
            <TextField
              placeholder='프로젝트 명을 입력해주세요 (최대 15자)'
              maxLength={MAX_PROJECT_NAME_LENGTH}
            />
          </label>
          <label
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            })}
          >
            <span
              className={css({
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
              })}
            >
              검수자 이름
            </span>
            <TextField
              placeholder='검수할 사람 이름을 입력해주세요 (최대 15자)'
              maxLength={MAX_PERSON_NAME_LENGTH}
            />
          </label>
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          {/* TODO: 공용 버튼 컴포넌트 개발 후 수정 필요 */}
          <button
            className={css({
              width: '320px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3182F7',
              color: 'white',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.875rem 0.75rem',
              cursor: 'pointer',
            })}
          >
            프로젝트 만들기
          </button>
        </div>
      </div>
    </Modal>
  );
};
