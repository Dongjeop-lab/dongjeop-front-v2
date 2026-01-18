import { useState } from 'react';
import { css } from 'styled-system/css';

import CloseImageIcon from '@/assets/close-image.svg';

import type { ImageDisplayInfo } from '../_types/store';
import { ConfirmIgnoreImageModal } from './confirm-ignore-image-modal';

interface ImageGalleryProps {
  images: ImageDisplayInfo[];
  storeName: string;
  onIgnoreImage: (imageId: number) => void;
}

/**
 * 상점 이미지 갤러리
 * - isIgnored가 true인 이미지는 표시하지 않음
 * - X 버튼 클릭 시 확인 모달 표시
 */
export const ImageGallery = ({
  images,
  storeName,
  onIgnoreImage,
}: ImageGalleryProps) => {
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  // isIgnored가 false인 이미지만 필터링하고 최대 4개까지
  const visibleImages = images.filter(img => !img.ignored).slice(0, 4);

  const handleIgnoreClick = (imageId: number) => {
    setSelectedImageId(imageId);
  };

  const handleConfirmIgnore = () => {
    if (selectedImageId) {
      onIgnoreImage(selectedImageId);
      setSelectedImageId(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedImageId(null);
  };

  return (
    <>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        })}
      >
        {visibleImages.map(image => (
          <div
            key={image.id}
            className={css({
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
            })}
          >
            <img
              src={image.image_url}
              alt={`${storeName} 이미지`}
              className={css({
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '8px',
              })}
            />
            {/* X 버튼 */}
            <button
              onClick={() => handleIgnoreClick(image.id)}
              className={css({
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '26px',
                height: '26px',
                cursor: 'pointer',
              })}
            >
              <img
                src={CloseImageIcon}
                alt='이미지 제외'
                width={26}
                height={26}
              />
            </button>
          </div>
        ))}
      </div>

      <ConfirmIgnoreImageModal
        isOpen={selectedImageId !== null}
        onClose={handleCloseModal}
        onConfirm={handleConfirmIgnore}
      />
    </>
  );
};
