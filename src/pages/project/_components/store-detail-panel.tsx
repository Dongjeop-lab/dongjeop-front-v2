import { css } from 'styled-system/css';

import Badge from '@/components/badge';

import { useIgnoreImage } from '../_hooks';
import type {
  StoreReviewDetailResponse,
  StoreReviewLabelRequest,
} from '../_types/store';
import { ImageGallery } from './image-gallery';
import { LabelingForm } from './labeling-form';

interface StoreDetailPanelProps {
  store: StoreReviewDetailResponse;
  storeId: number;
  onSubmit: (data: StoreReviewLabelRequest) => void;
  isSubmitting?: boolean;
}

/**
 * 상점 상세 정보 패널 (가로 레이아웃)
 * - 왼쪽: 상점 정보 + 이미지 갤러리 (가변)
 * - 오른쪽: 라벨링 폼 (272px 고정)
 */
export const StoreDetailPanel = ({
  store,
  storeId,
  onSubmit,
  isSubmitting = false,
}: StoreDetailPanelProps) => {
  const { mutate: ignoreImageMutate } = useIgnoreImage(storeId);

  const handleIgnoreImage = (imageId: number) => {
    ignoreImageMutate(imageId);
  };

  const initialFormData: StoreReviewLabelRequest = {
    has_step: store.image_analysis_result?.has_step ?? null,
    width_class: store.image_analysis_result?.width_class ?? null,
    has_movable_chair: store.image_analysis_result?.has_movable_chair ?? null,
    has_high_chair: store.image_analysis_result?.has_high_chair ?? null,
    has_fixed_chair: store.image_analysis_result?.has_fixed_chair ?? null,
    has_floor_chair: store.image_analysis_result?.has_floor_chair ?? null,
    is_not_sure_chair: store.image_analysis_result?.is_not_sure_chair ?? null,
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 4px 24px 0px #0000000A',
        overflow: 'hidden',
      })}
    >
      {/* 상단: 상점 정보 */}
      <div
        className={css({
          padding: '24px 24px 0',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          })}
        >
          <h1
            className={css({
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'text.base',
              lineHeight: '140%',
            })}
          >
            {store.name}
          </h1>
          {store.status === 2 && store.access_level !== null && (
            <Badge level={store.access_level} />
          )}
        </div>
        <p
          className={css({
            fontSize: '16px',
            color: 'text.sub',
            lineHeight: '140%',
            fontWeight: 'regular',
          })}
        >
          {store.address}
        </p>
      </div>

      {/* 하단: 이미지 갤러리 + 구분선 + 라벨링 폼 */}
      <div
        className={css({
          display: 'flex',
          flex: 1,
          marginTop: '24px',
          minHeight: 0,
        })}
      >
        {/* 이미지 갤러리 */}
        <div
          className={css({
            flex: 1,
            overflowY: 'auto',
            padding: '0 0 24px 24px',
            minWidth: '180px',
          })}
        >
          <ImageGallery
            images={store.images}
            storeName={store.name}
            onIgnoreImage={handleIgnoreImage}
          />
        </div>

        {/* 구분선 */}
        <div
          className={css({
            width: '1px',
            backgroundColor: '#0000001A',
            marginX: '20px',
            marginBottom: '24px',
          })}
        />

        {/* 라벨링 폼 */}
        <LabelingForm
          initialData={initialFormData}
          storeStatus={store.status}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
