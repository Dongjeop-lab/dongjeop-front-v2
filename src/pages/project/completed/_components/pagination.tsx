import { useState } from 'react';
import { css } from 'styled-system/css';

import ChevronDoubleLeft from '../_assets/chevron-double-left.svg';
import ChevronDoubleRight from '../_assets/chevron-double-right.svg';
import ChevronLeft from '../_assets/chevron-left.svg';
import ChevronRight from '../_assets/chevron-right.svg';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const [page, setPage] = useState(currentPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지 그룹 계산 (1~10, 11~20, ...)
  const currentGroup = Math.ceil(page / 10);
  const startPage = (currentGroup - 1) * 10 + 1;
  const endPage = Math.min(currentGroup * 10, totalPages);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToPrevPage = () => handlePageChange(Math.max(page - 1, 1));
  const goToNextPage = () => handlePageChange(Math.min(page + 1, totalPages));
  const goToLastPage = () => handlePageChange(totalPages);

  // 페이지 버튼 배열 생성
  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div
      className={css({
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      })}
    >
      {/* 처음 페이지, 이전 페이지로 */}
      <div
        className={css({
          display: 'flex',
        })}
      >
        <button
          className={css({
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: startPage === 1 ? '' : 'pointer',
            opacity: startPage === 1 ? 0.5 : 1,
            background: 'none',
            border: 'none',
          })}
          onClick={goToFirstPage}
          disabled={startPage === 1}
        >
          <img
            src={ChevronDoubleLeft}
            alt='처음으로'
          />
        </button>
        <button
          className={css({
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: page === 1 ? '' : 'pointer',
            opacity: page === 1 ? 0.5 : 1,
            background: 'none',
            border: 'none',
          })}
          onClick={goToPrevPage}
          disabled={page === 1}
        >
          <img
            src={ChevronLeft}
            alt='이전'
          />
        </button>
      </div>

      {/* 페이지 번호 버튼 */}
      <div
        className={css({
          display: 'flex',
          gap: '4px',
        })}
      >
        {pageButtons.map(pageNum => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={css({
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: 'none',
              outline: 'none',
              transition: 'all 0.2s',
              backgroundColor:
                page === pageNum ? 'button.primary' : 'transparent',
              color: page === pageNum ? 'button.text.primary' : 'inherit',
              _hover: {
                backgroundColor: 'button.pressed',
                color: 'button.text.pressed',
              },
              _active: {
                backgroundColor: 'button.pressed',
                color: 'button.text.pressed',
              },
            })}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 다음 페이지, 마지막 페이지로 */}
      <div
        className={css({
          display: 'flex',
        })}
      >
        <button
          className={css({
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: page === totalPages ? '' : 'pointer',
            opacity: page === totalPages ? 0.5 : 1,
            background: 'none',
            border: 'none',
          })}
          onClick={goToNextPage}
          disabled={page === totalPages}
        >
          <img
            src={ChevronRight}
            alt='다음'
          />
        </button>
        <button
          className={css({
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: endPage === totalPages ? '' : 'pointer',
            opacity: endPage === totalPages ? 0.5 : 1,
            background: 'none',
            border: 'none',
          })}
          onClick={goToLastPage}
          disabled={endPage === totalPages}
        >
          <img
            src={ChevronDoubleRight}
            alt='마지막으로'
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
