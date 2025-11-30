import { useState } from 'react';
import { css, cva } from 'styled-system/css';

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

const navigationButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    padding: 0,
    border: 'none',
    bg: 'none',
    transition: 'opacity 0.2s',
  },
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: '',
      },
      false: {
        opacity: 1,
        cursor: 'pointer',
      },
    },
  },
});

const pageButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    padding: 0,
    border: 'none',
    borderRadius: 'sm',
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      bg: 'button.pressed',
      color: 'button.text.pressed',
    },
    _active: {
      bg: 'button.pressed',
      color: 'button.text.pressed',
    },
  },
  variants: {
    isSelected: {
      true: {
        bg: 'button.primary',
        color: 'button.text.primary',
      },
      false: {
        bg: 'transparent',
        color: 'inherit',
      },
    },
  },
});

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
        alignItems: 'center',
        gap: '.75rem',
      })}
    >
      {/* 처음 페이지, 이전 페이지로 */}
      <div
        className={css({
          display: 'flex',
        })}
      >
        <button
          className={navigationButton({ disabled: page === 1 })}
          onClick={goToFirstPage}
          disabled={page === 1}
        >
          <img
            src={ChevronDoubleLeft}
            alt='첫 번째 페이지로'
          />
        </button>
        <button
          className={navigationButton({ disabled: page === 1 })}
          onClick={goToPrevPage}
          disabled={page === 1}
        >
          <img
            src={ChevronLeft}
            alt='이전 페이지로'
          />
        </button>
      </div>

      {/* 페이지 번호 버튼 */}
      <div
        className={css({
          display: 'flex',
          gap: '.25rem',
        })}
      >
        {pageButtons.map(pageNum => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={pageButton({ isSelected: page === pageNum })}
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
          className={navigationButton({ disabled: page === totalPages })}
          onClick={goToNextPage}
          disabled={page === totalPages}
        >
          <img
            src={ChevronRight}
            alt='다음 페이지로'
          />
        </button>
        <button
          className={navigationButton({ disabled: page === totalPages })}
          onClick={goToLastPage}
          disabled={page === totalPages}
        >
          <img
            src={ChevronDoubleRight}
            alt='마지막 페이지로'
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
