import { useState } from 'react';
import { css } from 'styled-system/css';

import { Button } from '@/components/button';
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
  const [projectName, setProjectName] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleCreateProject = () => {
    console.log({
      name: projectName,
      reviewer: reviewerName,
      csv_file: csvFile,
    });
    onOpenChange(false);
  };

  const isButtonEnabled = projectName && reviewerName && csvFile;

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
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          })}
        >
          <CSVUploader onFileSelect={setCsvFile} />
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
              onChange={e => setProjectName(e.target.value)}
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
              onChange={e => setReviewerName(e.target.value)}
            />
          </label>
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <Button
            disabled={!isButtonEnabled}
            size='lg'
            style={{
              width: '320px',
              height: '50px',
            }}
            onClick={handleCreateProject}
          >
            프로젝트 만들기
          </Button>
        </div>
      </div>
    </Modal>
    // TODO: 토스트 제작 후 추가 필요
  );
};
