import { css } from 'styled-system/css';

import { Button } from '@/components/button';
import Modal from '@/components/modal';

interface ConfirmIgnoreImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * 이미지 제외 확인 모달
 */
export const ConfirmIgnoreImageModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmIgnoreImageModalProps) => {
  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title={`이 이미지를 검수에서\n제외할까요?`}
      showCloseIcon={false}
      width='334px'
    >
      <div
        className={css({
          display: 'flex',
          gap: '8px',
        })}
      >
        <Button
          className={css({
            width: '86px',
            backgroundColor: 'button.disabled',
            borderRadius: '6px',
            cursor: 'pointer',
          })}
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          fullWidth
          variant='primary'
          onClick={onConfirm}
        >
          제외하기
        </Button>
      </div>
    </Modal>
  );
};
