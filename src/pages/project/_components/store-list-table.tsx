import { useSearchParams } from 'react-router';
import { css, cx } from 'styled-system/css';

import arrowDownUrl from '@/assets/arrow-down.svg';
import arrowUpUrl from '@/assets/arrow-up.svg';
import Badge from '@/components/badge';
import StatusDot from '@/components/status-dot';
import Table from '@/components/table';

import type { SortOrderType } from '../_types/params';
import type { StoreResponse } from '../_types/store';
import {
  formatChairTypes,
  formatReviewDate,
  formatStepLabel,
  formatWidthLabel,
} from '../_utils/format-label-base';

interface StoreListTableProps {
  stores: StoreResponse[];
  sortOrder: SortOrderType;
  onSortToggle: () => void;
}

const TEXT_STYLES = {
  sub: {
    color: 'text.sub',
    fontSize: '.75rem',
  },
  lineHeight: {
    sm: { lineHeight: '1.0625rem' },
    md: { lineHeight: '1.25rem' },
  },
} as const;

const COLUMN_WIDTHS = {
  status: css({ width: '100px', minWidth: '100px' }),
  name: css({ width: '200px', minWidth: '200px' }),
  totalImageCount: css({ width: '120px', minWidth: '120px' }),
  hasStep: css({ width: '80px', minWidth: '80px' }),
  widthClass: css({ width: '80px', minWidth: '80px' }),
  chairTypes: css({ width: '172px', minWidth: '172px' }),
  ignoredImageCount: css({ width: '145px', minWidth: '145px' }),
  accessLevel: css({ width: '100px', minWidth: '100px' }),
  reviewFinishedAt: css({ width: '145px', minWidth: '145px' }),
} as const;

const StoreListTable = ({
  stores,
  sortOrder,
  onSortToggle,
}: StoreListTableProps) => {
  const [_, setSearchParams] = useSearchParams();

  const handleClickStore = (storeId: number) => {
    setSearchParams(prev => {
      prev.set('store', storeId.toString());
      return prev;
    });
  };

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell className={COLUMN_WIDTHS.status}>
            진행 상황
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.name}>
            장소 정보
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.totalImageCount}>
            사진
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.hasStep}>
            계단/턱
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.widthClass}>
            통로
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.chairTypes}>
            의자유형
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.ignoredImageCount}>
            데이터 판정
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.accessLevel}>
            접근성 레벨
          </Table.HeaderCell>
          <Table.HeaderCell className={COLUMN_WIDTHS.reviewFinishedAt}>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              })}
            >
              검수일시
              <button
                onClick={e => {
                  e.stopPropagation();
                  onSortToggle();
                }}
                className={css({
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: 'transparent',
                })}
                aria-label={`정렬 전환: ${sortOrder === 'DESC' ? '오래된 순으로' : '최신순으로'}`}
              >
                <img
                  src={sortOrder === 'DESC' ? arrowUpUrl : arrowDownUrl}
                  alt=''
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {stores.map(store => (
          <Table.Row
            key={store.id}
            onClick={() => handleClickStore(store.id)}
            className={css({
              cursor: 'pointer',
            })}
          >
            <Table.Cell className={COLUMN_WIDTHS.status}>
              <Badge
                label={store.status === 1 ? '검수대기' : '검수완료'}
                variant={store.status === 1 ? 'blue' : 'gray'}
              />
            </Table.Cell>
            <Table.Cell className={COLUMN_WIDTHS.name}>
              <p className={css(TEXT_STYLES.lineHeight.md)}>{store.name}</p>
              <p
                className={css({
                  ...TEXT_STYLES.sub,
                  ...TEXT_STYLES.lineHeight.sm,
                })}
              >
                {store.address}
              </p>
            </Table.Cell>
            <Table.Cell
              className={cx(
                COLUMN_WIDTHS.totalImageCount,
                css({
                  '& > div': {
                    maxHeight: '60px',
                  },
                })
              )}
            >
              <div
                className={css({
                  position: 'relative',
                  height: '100%',
                  width: 'fit-content',
                  backgroundColor: store.thumbnail_url ? '' : '#F3F4F6',
                  borderRadius: '4px',
                  overflow: 'hidden',
                })}
              >
                <img
                  src={store.thumbnail_url}
                  className={css({
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '4px',
                  })}
                  alt={`${store.name} 썸네일 이미지`}
                />
                <div
                  className={css({
                    position: 'absolute',
                    right: '4px',
                    bottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1px 5px 1px 4px',
                    bg: '#292929CC',
                    borderRadius: '50px',
                    color: '#ffffff',
                    fontSize: '.625rem',
                    lineHeight: '.875rem',
                  })}
                >
                  +{store.total_image_count}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className={COLUMN_WIDTHS.hasStep}>
              <p className={css(TEXT_STYLES.lineHeight.md)}>
                {formatStepLabel(store.label_info?.has_step || null)}
              </p>
            </Table.Cell>
            <Table.Cell className={COLUMN_WIDTHS.widthClass}>
              <p className={css(TEXT_STYLES.lineHeight.md)}>
                {formatWidthLabel(store.label_info?.width_class || null)}
              </p>
            </Table.Cell>
            <Table.Cell className={COLUMN_WIDTHS.chairTypes}>
              <p className={css(TEXT_STYLES.lineHeight.md)}>
                {formatChairTypes(store.label_info)}
              </p>
            </Table.Cell>
            <Table.Cell className={COLUMN_WIDTHS.ignoredImageCount}>
              {[
                {
                  variant: 'normal' as const,
                  label: '정상',
                  count: store.total_image_count - store.ignored_image_count,
                },
                {
                  variant: 'error' as const,
                  label: '삭제',
                  count: store.ignored_image_count,
                },
              ].map(({ variant, label, count }) => (
                <div
                  key={variant}
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.375rem',
                    ...TEXT_STYLES.lineHeight.sm,
                  })}
                >
                  <StatusDot
                    variant={variant}
                    label={label}
                    labelClassName={css(TEXT_STYLES.sub)}
                  />
                  <hr
                    className={css({
                      width: '1px',
                      height: '10px',
                      margin: 0,
                      border: 'none',
                      backgroundColor: '#DDE1E6',
                    })}
                  />
                  <span className={css({ fontSize: '.75rem' })}>
                    {count > 0 ? `${count}장` : '-'}
                  </span>
                </div>
              ))}
            </Table.Cell>
            <Table.Cell className={COLUMN_WIDTHS.accessLevel}>
              {store.access_level !== null ? (
                <Badge level={store.access_level} />
              ) : (
                '-'
              )}
            </Table.Cell>
            <Table.Cell className={COLUMN_WIDTHS.reviewFinishedAt}>
              {store.review_finished_at ? (
                <p
                  className={css({
                    ...TEXT_STYLES.sub,
                    ...TEXT_STYLES.lineHeight.sm,
                    fontWeight: '400',
                    whiteSpace: 'pre-line',
                  })}
                >
                  {formatReviewDate(store.review_finished_at)}
                </p>
              ) : (
                <p className={css(TEXT_STYLES.lineHeight.md)}>-</p>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default StoreListTable;
