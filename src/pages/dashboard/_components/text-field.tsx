import type { InputHTMLAttributes } from 'react';
import { css } from 'styled-system/css';

export const TextField = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={css({
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1.4px solid #B3BFCE50',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#121619',
        _placeholder: {
          color: '#B3BFCE',
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      })}
    />
  );
};
