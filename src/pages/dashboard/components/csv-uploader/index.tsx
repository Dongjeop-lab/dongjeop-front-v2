import { css } from 'styled-system/css';

import {
  UploadCompletedView,
  UploadDefaultView,
  UploadDraggingView,
  UploadProgressView,
} from './upload-views';
import { useCSVUpload } from './use-csv-upload';

interface CSVUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

export const CSVUploader = ({ onFileSelect }: CSVUploaderProps) => {
  const {
    inputRef,
    isDragging,
    isUploading,
    uploadProgress,
    fileName,
    uploadedFile,
    handleButtonClick,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    handleCancelUpload,
  } = useCSVUpload({ onFileSelect });

  const renderUploadContent = () => {
    if (uploadedFile) {
      return (
        <UploadCompletedView
          fileName={fileName}
          onEdit={handleButtonClick}
        />
      );
    }

    if (isUploading) {
      return (
        <UploadProgressView
          fileName={fileName}
          progress={uploadProgress}
          onCancel={handleCancelUpload}
        />
      );
    }

    if (isDragging) {
      return <UploadDraggingView />;
    }

    return <UploadDefaultView onSelect={handleButtonClick} />;
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
