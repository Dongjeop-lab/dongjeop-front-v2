import type { ComponentProps } from 'react';
import { cva } from 'styled-system/css';

/**
 * 버튼 스타일 정의
 * Figma 디자인 스펙 기반
 */
const buttonVariants = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontWeight: '500',
    lineHeight: '140%',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    outline: 'none',
    _disabled: {
      backgroundColor: 'button.disabled',
      color: 'button.text.disabled',
      cursor: 'not-allowed',
      _hover: {
        backgroundColor: 'button.disabled',
        color: 'button.text.disabled',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'button.primary',
        color: 'button.text.primary',
        _hover: {
          backgroundColor: 'button.pressed',
          color: 'button.text.pressed',
        },
        _active: {
          backgroundColor: 'button.pressed',
          color: 'button.text.pressed',
        },
      },
      gray: {
        backgroundColor: 'button.gray',
        color: 'button.text.gray',
        _hover: {
          opacity: 0.8,
        },
        _active: {
          opacity: 0.7,
        },
      },
    },
    size: {
      sm: {
        height: '32px',
        padding: '6px 12px',
        fontSize: '14px',
        gap: '6px',
      },
      md: {
        height: '38px',
        padding: '8px 14px',
        fontSize: '16px',
        gap: '6px',
      },
      lg: {
        height: '50px',
        padding: '8px 14px',
        fontSize: '16px',
        gap: '6px',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'auto',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Column</Button>
 * <Button variant="gray" size="md">Column</Button>
 * <Button fullWidth>Column</Button>
 * <Button disabled>Column</Button>
 * ```
 */
export function Button({
  children,
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonVariants({ variant, size, fullWidth })} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
