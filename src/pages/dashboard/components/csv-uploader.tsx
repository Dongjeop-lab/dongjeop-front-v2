import { useRef, useState } from 'react';
import { css } from 'styled-system/css';

import { Button } from '@/components/button';

export const CSVUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // TODO: Handle file upload logic here
      console.log('Dropped files:', files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // TODO: Handle file upload logic here
      console.log('Selected files:', files);
    }
  };

  const renderUploadContent = () => {
    if (isDragging) {
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
    }

    if (!isDragging) {
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
            onClick={handleButtonClick}
          >
            파일 선택
          </Button>
        </div>
      );
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={css({
        width: '100%',
        padding: '1.25rem',
        borderRadius: '0.5rem',
        border: '1.2px dashed',
        borderColor: '#3182F724',
        backgroundColor: isDragging ? '#3182F724' : '#3182F708',
        cursor: 'default',
        transition: 'all 0.2s ease-in-out',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <input
        ref={inputRef}
        className={css({
          display: 'none',
        })}
        type='file'
        accept='.csv'
        onChange={handleFileChange}
      />
      {renderUploadContent()}
    </div>
  );
};
