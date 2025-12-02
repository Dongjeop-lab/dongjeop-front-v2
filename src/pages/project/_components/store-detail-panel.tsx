import { useState } from 'react';
import { css } from 'styled-system/css';

import { Button } from '@/components/button';

import type {
  HasStepType,
  StoreReviewDetailResponse,
  StoreReviewLabelRequest,
  WidthClassType,
} from '../_types/store';

interface StoreDetailPanelProps {
  store: StoreReviewDetailResponse;
  onSubmit: (data: StoreReviewLabelRequest) => void;
  isSubmitting?: boolean;
}

/**
 * 상점 상세 정보 패널
 * Figma 디자인 기반
 */
export const StoreDetailPanel = ({
  store,
  onSubmit,
  isSubmitting = false,
}: StoreDetailPanelProps) => {
  const [excludedImages, setExcludedImages] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<StoreReviewLabelRequest>({
    has_step: store.label_info?.has_step ?? null,
    width_class: store.label_info?.width_class ?? null,
    has_movable_chair: store.label_info?.has_movable_chair ?? null,
    has_high_chair: store.label_info?.has_high_chair ?? null,
    has_fixed_chair: store.label_info?.has_fixed_chair ?? null,
    has_floor_chair: store.label_info?.has_floor_chair ?? null,
    is_not_sure_chair: store.label_info?.is_not_sure_chair ?? null,
  });

  const toggleImageExclusion = (index: number) => {
    setExcludedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div
      className={css({
        flex: 1,
        height: 'calc(100vh - 70px)',
        overflowY: 'auto',
        backgroundColor: 'white',
        padding: '32px 40px',
      })}
    >
      {/* 상점 정보 */}
      <div
        className={css({
          marginBottom: '32px',
        })}
      >
        <h1
          className={css({
            fontSize: '24px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px',
          })}
        >
          {store.name}
        </h1>
        <p
          className={css({
            fontSize: '16px',
            color: '#6B7280',
          })}
        >
          {store.address}
        </p>
      </div>

      {/* 이미지 그리드 */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '40px',
        })}
      >
        {store.images_urls.slice(0, 4).map((url, index) => (
          <div
            key={index}
            className={css({
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#F3F4F6',
              opacity: excludedImages.has(index) ? 0.4 : 1,
              transition: 'opacity 0.2s',
            })}
          >
            <img
              src={url}
              alt={`${store.name} 이미지 ${index + 1}`}
              className={css({
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              })}
            />
            {/* X 버튼 */}
            <button
              onClick={() => toggleImageExclusion(index)}
              className={css({
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: excludedImages.has(index)
                  ? '#EF4444'
                  : 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '18px',
                transition: 'all 0.2s',
                _hover: {
                  backgroundColor: excludedImages.has(index)
                    ? '#DC2626'
                    : 'rgba(0, 0, 0, 0.7)',
                },
              })}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* AI 자동 선택 섹션 */}
      <div
        className={css({
          marginBottom: '32px',
        })}
      >
        <div
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#1F2937',
            color: 'white',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '20px',
          })}
        >
          ✨ AI 자동 선택
        </div>

        {/* 계단/턱 */}
        <div
          className={css({
            marginBottom: '24px',
          })}
        >
          <label
            className={css({
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            })}
          >
            계단/턱
          </label>
          <div
            className={css({
              display: 'flex',
              gap: '8px',
            })}
          >
            {[
              { value: 1, label: '있음' },
              { value: 2, label: '없음' },
              { value: 3, label: '불확실' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    has_step: option.value as HasStepType,
                  }))
                }
                className={css({
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid',
                  borderColor:
                    formData.has_step === option.value ? '#3182F7' : '#D1D5DB',
                  borderRadius: '8px',
                  backgroundColor:
                    formData.has_step === option.value ? '#3182F7' : 'white',
                  color:
                    formData.has_step === option.value ? 'white' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    borderColor: '#3182F7',
                  },
                })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 의자 유형 */}
        <div
          className={css({
            marginBottom: '24px',
          })}
        >
          <label
            className={css({
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            })}
          >
            의자 유형 (중복 선택 가능)
          </label>
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            })}
          >
            {[
              { key: 'has_movable_chair', label: '내온 이동식 의자' },
              { key: 'has_high_chair', label: '높은 이동식 의자' },
              { key: 'has_fixed_chair', label: '고정식 의자' },
              { key: 'has_floor_chair', label: '좌식 의자' },
              { key: 'is_not_sure_chair', label: '불확실' },
            ].map(option => (
              <button
                key={option.key}
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    [option.key]:
                      !prev[option.key as keyof StoreReviewLabelRequest],
                  }))
                }
                className={css({
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid',
                  borderColor: formData[
                    option.key as keyof StoreReviewLabelRequest
                  ]
                    ? '#3182F7'
                    : '#D1D5DB',
                  borderRadius: '8px',
                  backgroundColor: formData[
                    option.key as keyof StoreReviewLabelRequest
                  ]
                    ? '#3182F7'
                    : 'white',
                  color: formData[option.key as keyof StoreReviewLabelRequest]
                    ? 'white'
                    : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    borderColor: '#3182F7',
                  },
                })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 통로 섹션 */}
      <div
        className={css({
          marginBottom: '40px',
        })}
      >
        <h3
          className={css({
            fontSize: '16px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
          })}
        >
          통로
        </h3>

        {/* 전입 불가/좁음/보통 */}
        <div
          className={css({
            marginBottom: '16px',
          })}
        >
          <label
            className={css({
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
            })}
          >
            전입 불가/좁음/보통
          </label>
          <div
            className={css({
              display: 'flex',
              gap: '8px',
            })}
          >
            {[
              { value: 1, label: '전입 불가' },
              { value: 2, label: '좁음' },
              { value: 3, label: '보통' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    width_class: option.value as WidthClassType,
                  }))
                }
                className={css({
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid',
                  borderColor:
                    formData.width_class === option.value
                      ? '#3182F7'
                      : '#D1D5DB',
                  borderRadius: '8px',
                  backgroundColor:
                    formData.width_class === option.value ? '#3182F7' : 'white',
                  color:
                    formData.width_class === option.value ? 'white' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    borderColor: '#3182F7',
                  },
                })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 장소 검수 완료 버튼 */}
      <Button
        variant='primary'
        size='lg'
        fullWidth
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? '제출 중...' : '장소 검수 완료'}
      </Button>
    </div>
  );
};
