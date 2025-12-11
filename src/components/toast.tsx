import * as RadixToast from '@radix-ui/react-toast';
import { css } from 'styled-system/css';

import { useToast } from '@/hooks/use-toast';

const Toast = () => {
  const { open, setOpen, content } = useToast();

  return (
    <RadixToast.Provider swipeDirection='down'>
      <RadixToast.Root
        open={open}
        onOpenChange={setOpen}
        className={css({
          position: 'absolute',
          bottom: '130px',
          left: '50%',
          translate: '-50% 0',
          width: '20rem',
          padding: '0.75rem 0',
          borderRadius: '0.75rem',
          backgroundColor: '#00000060',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
        })}
      >
        <RadixToast.Description
          className={css({
            color: '#fff',
            fontWeight: 'medium',
          })}
        >
          {content}
        </RadixToast.Description>
      </RadixToast.Root>
      <RadixToast.Viewport />
    </RadixToast.Provider>
  );
};

export default Toast;
