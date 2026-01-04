import { css } from 'styled-system/css';

import { LabelButton } from './label-button';

// 의자 유형 키 상수
const CHAIR_KEYS = {
  MOVABLE: 'has_movable_chair',
  HIGH: 'has_high_chair',
  FIXED: 'has_fixed_chair',
  FLOOR: 'has_floor_chair',
  NOT_SURE: 'is_not_sure_chair',
} as const;

type ChairKey = (typeof CHAIR_KEYS)[keyof typeof CHAIR_KEYS];

// 일반 의자 유형 키 목록 (불확실 제외)
const NORMAL_CHAIR_KEYS = [
  CHAIR_KEYS.MOVABLE,
  CHAIR_KEYS.HIGH,
  CHAIR_KEYS.FIXED,
  CHAIR_KEYS.FLOOR,
] as const;

interface ChairOption {
  key: ChairKey;
  label: string;
}

const CHAIR_OPTIONS: ChairOption[] = [
  { key: CHAIR_KEYS.MOVABLE, label: '낮은 이동식 의자' },
  { key: CHAIR_KEYS.HIGH, label: '높은 이동식 의자' },
  { key: CHAIR_KEYS.FIXED, label: '고정식 의자' },
  { key: CHAIR_KEYS.FLOOR, label: '좌식 의자' },
  { key: CHAIR_KEYS.NOT_SURE, label: '불확실' },
];

interface ChairTypeSelectorProps {
  values: Record<ChairKey, boolean>;
  onChange: (key: ChairKey, value: boolean) => void;
}

/**
 * 의자 유형 선택 컴포넌트 (다중 선택)
 * - 선택된 값을 다시 클릭하면 선택 해제
 */
export const ChairTypeSelector = ({
  values,
  onChange,
}: ChairTypeSelectorProps) => {
  const handleClick = (key: ChairKey) => {
    const currentValue = values[key];
    const newValue = !currentValue;

    // "불확실"을 선택하는 경우
    if (key === CHAIR_KEYS.NOT_SURE && newValue) {
      // 다른 모든 의자 유형 선택 해제
      NORMAL_CHAIR_KEYS.forEach(chairKey => {
        onChange(chairKey, false);
      });
      onChange(CHAIR_KEYS.NOT_SURE, true);
    }
    // 다른 의자 유형을 선택하는 경우
    else if (key !== CHAIR_KEYS.NOT_SURE && newValue) {
      // "불확실" 선택 해제
      onChange(CHAIR_KEYS.NOT_SURE, false);
      onChange(key, true);
    }
    // 선택 해제하는 경우
    else {
      onChange(key, newValue);
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
        의자 유형{' '}
        <span className={css({ color: 'text.dashboard.sub' })}>
          (중복 선택 가능)
        </span>
      </label>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        })}
      >
        {CHAIR_OPTIONS.map(option => {
          const isSelected = values[option.key];
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
