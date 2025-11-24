import type { ReactNode } from 'react';
import { css, cx } from 'styled-system/css';
import { circle, flex } from 'styled-system/patterns';

interface StatusDotProps {
  variant: 'normal' | 'pending' | 'error';
  label?: ReactNode;
  labelClassName?: string;
}

const variantColors = {
  normal: '#3182F7',
  pending: '#FFB600',
  error: '#F36E6E',
} as const;

const defaultLabels = {
  normal: '정상',
  pending: '보류',
  error: '삭제 대상',
} as const;

const StatusDot = ({ variant, label, labelClassName }: StatusDotProps) => {
  const displayLabel = label ?? defaultLabels[variant];

  return (
    <div className={flex({ direction: 'row', gap: '6px', align: 'center' })}>
      <div
        className={circle({ size: '7px' })}
        style={{ backgroundColor: variantColors[variant] }}
      />
      <span
        className={cx(
          css({
            fontSize: '.8125rem',
            fontWeight: '500',
            lineHeight: '140%',
            color: '#121619',
          }),
          labelClassName
        )}
      >
        {displayLabel}
      </span>
    </div>
  );
};

export default StatusDot;
