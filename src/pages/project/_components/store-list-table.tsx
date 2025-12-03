import { css } from 'styled-system/css';

import Badge from '@/components/badge';
import StatusDot from '@/components/status-dot';
import Table from '@/components/table';

import type { StoreResponse } from '../_types/store';
import {
  formatChairTypes,
  formatReviewDate,
  formatStepLabel,
  formatWidthLabel,
} from '../_utils/format-label-base';

interface StoreListTableProps {
  filteredStores: StoreResponse[];
}

const StoreListTable = ({ filteredStores }: StoreListTableProps) => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>진행 상황</Table.HeaderCell>
          <Table.HeaderCell>장소 정보</Table.HeaderCell>
          <Table.HeaderCell>사진</Table.HeaderCell>
          <Table.HeaderCell>계단/턱</Table.HeaderCell>
          <Table.HeaderCell>통로</Table.HeaderCell>
          <Table.HeaderCell>의자유형</Table.HeaderCell>
          <Table.HeaderCell>데이터 판정</Table.HeaderCell>
          <Table.HeaderCell>접근성 레벨</Table.HeaderCell>
          <Table.HeaderCell>검수일시</Table.HeaderCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {filteredStores.map(store => (
          <Table.Row key={store.id}>
            <Table.Cell>
              {/* XXX: 뱃지 변경 가능성 있음 (피그마에 질문 남긴 상태) */}
              <Badge
                label={store.status === 1 ? '검수중' : '검수완료'}
                variant={store.status === 1 ? 'primary' : 'gray'}
              />
            </Table.Cell>
            <Table.Cell>
              <p className={css({ lineHeight: '1.25rem' })}>{store.name}</p>
              <p
                className={css({
                  color: 'text.sub',
                  fontSize: '.75rem',
                  lineHeight: '1.0625rem',
                })}
              >
                {store.address}
              </p>
            </Table.Cell>
            <Table.Cell>
              {/* TODO: 대표사진 띄우고, 장수 div는 우측 하단에 */}
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1px 5px 1px 4px',
                  width: 'fit-content',
                  bg: '#292929CC',
                  borderRadius: '50px',
                  color: '#ffffff',
                  fontSize: '.625rem',
                  lineHeight: '.875rem',
                })}
              >
                +{store.total_image_count}
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className={css({ lineHeight: '1.25rem' })}>
                {formatStepLabel(store.label_info?.has_step || null)}
              </p>
            </Table.Cell>
            <Table.Cell>
              <p className={css({ lineHeight: '1.25rem' })}>
                {formatWidthLabel(store.label_info?.width_class || null)}
              </p>
            </Table.Cell>
            <Table.Cell>
              <p className={css({ lineHeight: '1.25rem' })}>
                {formatChairTypes(store.label_info)}
              </p>
            </Table.Cell>
            <Table.Cell>
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
                    lineHeight: '1.0625rem',
                  })}
                >
                  <StatusDot
                    variant={variant}
                    label={label}
                    labelClassName={css({
                      color: 'text.sub',
                      fontSize: '.75rem',
                    })}
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
            <Table.Cell>
              {store.access_level ? <Badge level={store.access_level} /> : '-'}
            </Table.Cell>
            <Table.Cell>
              {store.review_finished_at ? (
                <p
                  className={css({
                    color: 'text.sub',
                    fontSize: '.75rem',
                    fontWeight: '400',
                    lineHeight: '1.0625rem',
                    whiteSpace: 'pre-line',
                  })}
                >
                  {formatReviewDate(store.review_finished_at)}
                </p>
              ) : (
                <p className={css({ lineHeight: '1.25rem' })}>-</p>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default StoreListTable;
