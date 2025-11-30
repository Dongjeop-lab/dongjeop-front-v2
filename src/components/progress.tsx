import * as ProgressPrimitive from '@radix-ui/react-progress';
import { css } from 'styled-system/css';

interface ProgressProps {
  value: number;
  width?: string;
  height?: string;
}

export const Progress = ({
  value,
  width = '100%',
  height = '0.5rem',
}: ProgressProps) => {
  return (
    <ProgressPrimitive.Root
      className={css({
        position: 'relative',
        overflow: 'hidden',
        background: '#3182F712',
        borderRadius: '3xl',
        transform: 'translateZ(0)',
      })}
      value={value}
      style={{ width, height }}
    >
      <ProgressPrimitive.Indicator
        className={css({
          backgroundColor: 'button.primary',
          width: '100%',
          height: '100%',
          transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
          borderRadius: '3xl',
        })}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
