import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

interface LabelButtonProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  size?: 'default' | 'large';
}

/**
 * 라벨링 폼 전용 버튼 컴포넌트
 * - selected: true -> #495058 배경, #FFFFFF 텍스트
 * - selected: false -> #F2F4F8 배경, #121619 텍스트
 * - size: default (13px, weight 500), large (15px, weight 600)
 */
export const LabelButton = ({
  selected,
  onClick,
  children,
  size = 'default',
}: LabelButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={css({
        padding: '10px 11px',
        height: size === 'large' ? '34px' : '29px',
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100px',
        fontSize: size === 'large' ? '0.9375rem' : '0.8125rem',
        fontWeight: size === 'large' ? '600' : '500',
        lineHeight: '140%',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backgroundColor: selected ? '#495058' : '#F2F4F8',
        color: selected ? '#FFFFFF' : '#121619',
        _hover: {
          opacity: 0.8,
        },
      })}
    >
      {children}
    </button>
  );
};
