import { useEffect, useMemo, useState } from 'react';
import { css } from 'styled-system/css';

import AiAutoSelectIcon from '@/assets/ai-auto-select.svg';
import CheckIcon from '@/assets/check.svg';
import { Button } from '@/components/button';

import type { StoreReviewLabelRequest } from '../_types/store';
import { ChairTypeSelector } from './chair-type-selector';
import { LabelButton } from './label-button';
import { StepSelector } from './step-selector';
import { WidthSelector } from './width-selector';

interface LabelingFormProps {
  initialData: StoreReviewLabelRequest;
  storeStatus: number;
  onSubmit: (data: StoreReviewLabelRequest) => void;
  isSubmitting?: boolean;
}

/**
 * 라벨링 폼 컴포넌트
 * - AI 자동 선택 값을 초기값으로 설정
 * - 값이 변경되었을 때만 제출 버튼 활성화
 */
export const LabelingForm = ({
  initialData,
  storeStatus,
  onSubmit,
  isSubmitting = false,
}: LabelingFormProps) => {
  const [formData, setFormData] =
    useState<StoreReviewLabelRequest>(initialData);
  const [isCompleted, setIsCompleted] = useState(storeStatus === 2);

  // storeStatus가 변경되면 formData와 isCompleted 업데이트
  useEffect(() => {
    setFormData(initialData);
    setIsCompleted(storeStatus === 2);
  }, [initialData, storeStatus]);

  // AI 자동 선택 활성화 여부 (초기값: API에서 값이 하나라도 있으면 true)
  const hasInitialValues = useMemo(() => {
    return Object.values(initialData).some(value => value !== null);
  }, [initialData]);

  const [isAiEnabled, setIsAiEnabled] = useState(hasInitialValues);

  // AI 활성화 상태도 initialData 변경 시 업데이트
  useEffect(() => {
    setIsAiEnabled(hasInitialValues);
  }, [hasInitialValues]);

  // formData 변경 감지 (useMemo로 최적화)
  const isChanged = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  }, [formData, initialData]);

  // AI 자동 선택 토글
  const handleAiToggle = () => {
    if (isAiEnabled) {
      // AI 자동 선택 해제 -> 모든 값 null로 초기화
      setFormData({
        has_step: null,
        width_class: null,
        has_movable_chair: null,
        has_high_chair: null,
        has_fixed_chair: null,
        has_floor_chair: null,
        is_not_sure_chair: null,
      });
      setIsAiEnabled(false);
    } else {
      // AI 자동 선택 활성화 -> initialData로 복원
      setFormData(initialData);
      setIsAiEnabled(true);
    }
  };

  const handleStepChange = (value: 1 | 2 | 3 | null) => {
    setFormData(prev => ({ ...prev, has_step: value }));
    setIsAiEnabled(false);
  };

  const handleChairChange = (key: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
    setIsAiEnabled(false);
  };

  const handleWidthChange = (value: 1 | 2 | 3 | 4 | 5 | null) => {
    setFormData(prev => ({ ...prev, width_class: value }));
    setIsAiEnabled(false);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setIsCompleted(true);
  };

  // 버튼 상태 계산
  // 검수중(status=1): 항상 활성화 (제출 중에만 disabled)
  // 검수완료(status=2): 변경사항 없으면 disabled, 변경사항 있으면 활성화
  const isButtonDisabled = isSubmitting || (isCompleted && !isChanged);

  // 버튼 variant 계산
  // 검수완료 상태에서 변경사항이 없으면 gray, 그 외에는 primary
  const buttonVariant = isCompleted && !isChanged ? 'gray' : 'primary';

  // 버튼 텍스트 계산
  const getButtonText = () => {
    if (isSubmitting) return '제출 중...';
    if (isCompleted && isChanged) return '업데이트';
    return '장소 검수 완료';
  };

  // 체크 아이콘 표시 여부
  // 검수완료 상태에서 변경사항이 없을 때만 표시
  const showCheckIcon = isCompleted && !isChanged && !isSubmitting;

  return (
    <div
      className={css({
        width: '272px',
        height: '100%',
        overflowY: 'auto',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        paddingRight: '24px',
        paddingBottom: '24px',
        gap: '32px',
      })}
    >
      {/* AI 자동 선택 버튼 */}
      <div>
        <LabelButton
          size='large'
          selected={isAiEnabled}
          onClick={handleAiToggle}
        >
          <img
            src={AiAutoSelectIcon}
            alt='AI 자동 선택'
            width={14}
            height={14}
            className={css({
              marginRight: '1px',
            })}
          />
          AI 자동 선택
        </LabelButton>
      </div>

      {/* 계단/턱 */}
      <StepSelector
        value={formData.has_step}
        onChange={handleStepChange}
      />

      {/* 의자 유형 */}
      <ChairTypeSelector
        has_movable_chair={formData.has_movable_chair ?? false}
        has_high_chair={formData.has_high_chair ?? false}
        has_fixed_chair={formData.has_fixed_chair ?? false}
        has_floor_chair={formData.has_floor_chair ?? false}
        is_not_sure_chair={formData.is_not_sure_chair ?? false}
        onChange={handleChairChange}
      />

      {/* 통로 */}
      <WidthSelector
        value={formData.width_class}
        onChange={handleWidthChange}
      />

      {/* 제출 버튼 */}
      <div
        className={css({
          marginTop: 'auto',
          paddingTop: '24px',
        })}
      >
        <Button
          variant={buttonVariant}
          size='lg'
          fullWidth
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          style={buttonVariant === 'gray' ? { color: '#495058' } : undefined}
        >
          {getButtonText()}
          {showCheckIcon && (
            <img
              src={CheckIcon}
              alt='체크 아이콘'
              width={13}
              height={14}
            />
          )}
        </Button>
      </div>
    </div>
  );
};
