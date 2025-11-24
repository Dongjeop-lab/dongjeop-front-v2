import * as Dialog from '@radix-ui/react-dialog';
import type { PropsWithChildren } from 'react';

import { css } from '../../styled-system/css';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  title: string;
  width?: string | number;
  height?: string | number;
  gap?: string | number;
  onOpenChange: (open: boolean) => void;
}

const Modal = ({
  open,
  title,
  children,
  width = 'auto',
  height = 'auto',
  gap = '2rem',
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
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
          })}
          style={{ width, height, gap }}
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
                fontSize: '1.25rem',
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                <img
                  src='/icons/clear.svg'
                  alt='Close'
                />
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
