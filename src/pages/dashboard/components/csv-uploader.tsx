import { useRef, useState } from 'react';
import { css } from 'styled-system/css';

import { Button } from '@/components/button';
import { Progress } from '@/components/progress';

export const CSVUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setIsDragging(false);
    setFileName(file.name);
    setUploadedFile(null);

    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
    }

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          uploadIntervalRef.current = null;
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            setUploadedFile(file);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    uploadIntervalRef.current = interval;
  };

  const handleCancelUpload = () => {
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }
    setIsUploading(false);
    setUploadProgress(0);
    setFileName(null);
    setUploadedFile(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const renderUploadContent = () => {
    if (uploadedFile) {
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
            onClick={handleButtonClick}
          >
            파일수정
          </Button>
        </div>
      );
    }

    if (isUploading) {
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
              value={uploadProgress}
              width='200px'
              height='0.5rem'
            />
          </div>
          <button
            onClick={handleCancelUpload}
            className={css({
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
    }

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
        borderColor: isDragging ? '#3182F7' : '#3182F724',
        backgroundColor: isDragging ? '#3182F710' : '#3182F708',
        cursor: isUploading ? 'default' : 'pointer',
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
        disabled={isUploading}
      />
      {renderUploadContent()}
    </div>
  );
};
