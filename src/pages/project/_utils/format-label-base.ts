import type { HasStepType, LabelBase, WidthClassType } from '../_types/store';

/**
 * 계단/턱 라벨 포맷팅
 * @param hasStep 1(YES) | 2(NO) | 3(NOT_SURE) | null
 */
export const formatStepLabel = (hasStep: HasStepType | null): string => {
  if (!hasStep) return '-';

  switch (hasStep) {
    case 1:
      return '있음';
    case 2:
      return '없음';
    case 3:
      return '불확실';
    default:
      return '-';
  }
};

/**
 * 통로 너비 라벨 포맷팅
 * @param widthClass 1(NARROW) | 2(NORMAL) | 3(WIDE) | 4(IMPOSSIBLE) | 5(NOT_SURE) | null
 */
export const formatWidthLabel = (widthClass: WidthClassType | null): string => {
  if (!widthClass) return '-';

  switch (widthClass) {
    case 1:
      return '좁음';
    case 2:
      return '보통';
    case 3:
      return '넓음';
    case 4:
      return '진입 불가';
    case 5:
      return '불확실';
    default:
      return '-';
  }
};

/**
 * 의자 유형 라벨 포맷팅
 * @param labelInfo 라벨 정보
 */
export const formatChairTypes = (labelInfo: LabelBase | null): string => {
  if (!labelInfo) return '-';

  const types = [];
  if (labelInfo.has_movable_chair) types.push('낮은 이동식');
  if (labelInfo.has_high_chair) types.push('높은 이동식');
  if (labelInfo.has_fixed_chair) types.push('고정식');
  if (labelInfo.has_floor_chair) types.push('좌식');
  if (labelInfo.is_not_sure_chair) types.push('불확실');

  return types.length > 0 ? types.join(', ') : '-';
};

/**
 * 날짜 포맷팅
 * @param dateString ISO 날짜 문자열
 * @returns "2025. 11. 15\n오후 05:38" 형식
 */
export const formatReviewDate = (dateString: string | null): string => {
  if (!dateString) return '-';

  const date = new Date(dateString);

  // 날짜 부분
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const datePart = `${year}. ${month}. ${day}`;

  // 시간 부분
  const timePart = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart}\n${timePart}`;
};
