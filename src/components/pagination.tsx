import { css, cva } from 'styled-system/css';

import ChevronDoubleLeft from '../assets/chevron-double-left.svg';
import ChevronDoubleRight from '../assets/chevron-double-right.svg';
import ChevronLeft from '../assets/chevron-left.svg';
import ChevronRight from '../assets/chevron-right.svg';

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
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    _hover: {
      bg: '#0000000D',
      borderRadius: 'full',
    },
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
    transition: 'all 0.2s ease-out',
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
        _hover: {
          bg: '#0000000D',
        },
      },
    },
  },
});

const PAGES_PER_GROUP = 10; // 페이지 번호 그룹당 표시 개수 (1~10, 11~20, ...)
const DEFAULT_ITEMS_PER_PAGE = 10; // 페이지당 기본 아이템 개수
const FIRST_PAGE = 1;

const Pagination = ({
  totalItems,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  currentPage = FIRST_PAGE,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
  const startPage = (currentGroup - 1) * PAGES_PER_GROUP + FIRST_PAGE;
  const endPage = Math.min(currentGroup * PAGES_PER_GROUP, totalPages);

  const handlePageChange = (newPage: number) => {
    onPageChange?.(newPage);
  };

  const goToPrevPage = () =>
    handlePageChange(Math.max(currentPage - 1, FIRST_PAGE));
  const goToNextPage = () =>
    handlePageChange(Math.min(currentPage + 1, totalPages));
  const goToPrevGroup = () =>
    handlePageChange(Math.max(startPage - PAGES_PER_GROUP, FIRST_PAGE));
  const goToNextGroup = () =>
    handlePageChange(Math.min(endPage + 1, totalPages));

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
      {/* 이전 그룹, 이전 페이지로 */}
      <div
        className={css({
          display: 'flex',
        })}
      >
        <button
          className={navigationButton({ disabled: startPage === FIRST_PAGE })}
          onClick={goToPrevGroup}
          disabled={startPage === FIRST_PAGE}
        >
          <img
            src={ChevronDoubleLeft}
            alt='이전 그룹으로'
          />
        </button>
        <button
          className={navigationButton({ disabled: currentPage === FIRST_PAGE })}
          onClick={goToPrevPage}
          disabled={currentPage === FIRST_PAGE}
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
            className={pageButton({ isSelected: currentPage === pageNum })}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 다음 페이지, 다음 그룹으로 */}
      <div
        className={css({
          display: 'flex',
        })}
      >
        <button
          className={navigationButton({ disabled: currentPage === totalPages })}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <img
            src={ChevronRight}
            alt='다음 페이지로'
          />
        </button>
        <button
          className={navigationButton({ disabled: endPage === totalPages })}
          onClick={goToNextGroup}
          disabled={endPage === totalPages}
        >
          <img
            src={ChevronDoubleRight}
            alt='다음 그룹으로'
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
