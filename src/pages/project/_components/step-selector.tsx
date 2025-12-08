import { css } from 'styled-system/css';

import { LabelButton } from './label-button';

interface StepSelectorProps {
  value: 1 | 2 | 3 | null;
  onChange: (value: 1 | 2 | 3 | null) => void;
}

const OPTIONS = [
  { value: 1 as const, label: '있음' },
  { value: 2 as const, label: '없음' },
  { value: 3 as const, label: '불확실' },
];

/**
 * 계단/턱 선택 컴포넌트
 * - 선택된 값을 다시 클릭하면 선택 해제 (null)
 */
export const StepSelector = ({ value, onChange }: StepSelectorProps) => {
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
      <label
        className={css({
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 'semibold',
          color: 'text.dashboard.secondary',
          marginBottom: '16px',
        })}
      >
        계단/턱
      </label>
      <div
        className={css({
          display: 'flex',
          gap: '16px',
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
