import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

interface BadgeProps {
  variant?: 'primary' | 'gray' | 'red' | 'orange' | 'green' | 'blue' | 'purple';
  label?: ReactNode;
  level?: 0 | 1 | 2 | 3 | 4 | 5;
}

const variantStyles = {
  primary: { color: '#FFFFFF', backgroundColor: '#3182F7' },
  gray: { color: '#495058', backgroundColor: '#E7EDF3' },
  red: { color: '#E74444', backgroundColor: '#FF626229' },
  orange: { color: '#D87000', backgroundColor: '#FFB65133' },
  green: { color: '#2DA962', backgroundColor: '#26D07033' },
  blue: { color: '#1C6EE4', backgroundColor: '#3182F724' },
  purple: { color: '#8844E7', backgroundColor: '#7762FF29' },
};

const levelToVariant = {
  0: 'green',
  1: 'green',
  2: 'orange',
  3: 'orange',
  4: 'red',
  5: 'red',
} as const;

const Badge = ({ variant = 'primary', label, level }: BadgeProps) => {
  const colorVariant = level !== undefined ? levelToVariant[level] : variant;
  const { color, backgroundColor } = variantStyles[colorVariant];
  const displayLabel =
    label ?? (level !== undefined ? `Lv.${level}` : undefined);

  return (
    <p
      className={css({
        py: '2px',
        px: '6px',
        width: 'fit-content',
        borderRadius: '.375rem',
        fontSize: '.75rem',
        fontWeight: '500',
        lineHeight: '140%',
      })}
      style={{ color, backgroundColor }}
    >
      {displayLabel}
    </p>
  );
};

export default Badge;
