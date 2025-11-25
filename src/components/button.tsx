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
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: '140%',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    outline: 'none',
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
  },
  defaultVariants: {
    size: 'md',
  },
});

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <Button size="sm">Column</Button>
 * <Button size="md">Column</Button>
 * <Button size="lg">Column</Button>
 * <Button disabled>Column</Button>
 * ```
 */
export function Button({ children, size, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ size })}
      {...props}
    >
      {children}
    </button>
  );
}
