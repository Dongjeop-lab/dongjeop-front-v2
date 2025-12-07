import { css } from 'styled-system/css';

import { LabelButton } from './label-button';

interface WidthSelectorProps {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (value: 1 | 2 | 3 | 4 | 5 | null) => void;
}

const OPTIONS = [
  { value: 1 as const, label: '진입 불가' },
  { value: 2 as const, label: '좁음' },
  { value: 3 as const, label: '보통' },
];

/**
 * 통로 너비 선택 컴포넌트
 * - 선택된 값을 다시 클릭하면 선택 해제 (null)
 */
export const WidthSelector = ({ value, onChange }: WidthSelectorProps) => {
  const handleClick = (optionValue: 1 | 2 | 3) => {
    // 같은 값을 클릭하면 선택 해제
    if (value === optionValue) {
      onChange(null);
    } else {
      onChange(optionValue);
    }
  };

  return (
    <div>
      <h3
        className={css({
          fontSize: '0.875rem',
          fontWeight: 'semibold',
          color: 'text.base',
          marginBottom: '12px',
        })}
      >
        통로
      </h3>
      <div
        className={css({
          display: 'flex',
          gap: '12px',
        })}
      >
        {OPTIONS.map(option => (
          <LabelButton
            key={option.value}
            selected={value === option.value}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </LabelButton>
        ))}
      </div>
    </div>
  );
};
