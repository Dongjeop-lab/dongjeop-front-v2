import { css } from 'styled-system/css';

import { LabelButton } from './label-button';

interface ChairTypeSelectorProps {
  has_movable_chair: boolean;
  has_high_chair: boolean;
  has_fixed_chair: boolean;
  has_floor_chair: boolean;
  is_not_sure_chair: boolean;
  onChange: (key: string, value: boolean) => void;
}

const CHAIR_OPTIONS = [
  { key: 'has_movable_chair', label: '낮은 이동식 의자' },
  { key: 'has_high_chair', label: '높은 이동식 의자' },
  { key: 'has_fixed_chair', label: '고정식 의자' },
  { key: 'has_floor_chair', label: '좌식 의자' },
  { key: 'is_not_sure_chair', label: '불확실' },
];

/**
 * 의자 유형 선택 컴포넌트 (다중 선택)
 * - 선택된 값을 다시 클릭하면 선택 해제
 */
export const ChairTypeSelector = ({
  has_movable_chair,
  has_high_chair,
  has_fixed_chair,
  has_floor_chair,
  is_not_sure_chair,
  onChange,
}: ChairTypeSelectorProps) => {
  const values = {
    has_movable_chair,
    has_high_chair,
    has_fixed_chair,
    has_floor_chair,
    is_not_sure_chair,
  };

  const handleClick = (key: string) => {
    const currentValue = values[key as keyof typeof values];
    onChange(key, !currentValue);
  };

  return (
    <div
      className={css({
        marginBottom: '24px',
      })}
    >
      <label
        className={css({
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 'semibold',
          color: 'text.base',
          marginBottom: '8px',
        })}
      >
        의자 유형 (중복 선택 가능)
      </label>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        })}
      >
        {CHAIR_OPTIONS.map(option => {
          const isSelected = values[option.key as keyof typeof values];
          return (
            <LabelButton
              key={option.key}
              selected={isSelected}
              onClick={() => handleClick(option.key)}
            >
              {option.label}
            </LabelButton>
          );
        })}
      </div>
    </div>
  );
};
