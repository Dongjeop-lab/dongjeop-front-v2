import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

import { css } from '../../styled-system/css';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  onOpenChange: (open: boolean) => void;
}

const Modal = ({
  open,
  title,
  children,
  width = 'auto',
  height = 'auto',
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={css({
            position: 'fixed',
            inset: 0,
            bg: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
          })}
        />
        <Dialog.Content
          className={css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bg: 'white',
            borderRadius: '16px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            zIndex: 101,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
          })}
          style={{ width, height }}
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
          >
            <Dialog.Title
              className={css({
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333',
              })}
            >
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className={css({
                  cursor: 'pointer',
                  color: '#666',
                  _hover: { color: '#333' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
                aria-label='Close'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 6L6 18'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6 6L18 18'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
