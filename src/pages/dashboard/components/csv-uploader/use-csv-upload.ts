import { useRef, useState } from 'react';

interface UseCSVUploadProps {
  onFileSelect?: (file: File | null) => void;
}

export const useCSVUpload = ({ onFileSelect }: UseCSVUploadProps = {}) => {
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
    if (!isUploading && !uploadedFile) {
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
    onFileSelect?.(null);

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
            onFileSelect?.(file);
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
    onFileSelect?.(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading || uploadedFile) return;

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

  return {
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
  };
};
