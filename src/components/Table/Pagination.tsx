import { useMemo } from "react";
import styles from "./styles.module.css";
import { PaginationProps } from "./types";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps): JSX.Element => {
  const visiblePages = useMemo(() => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages, maxVisiblePages]);

  return (
    <div
      className={styles.paginationContainer}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
        aria-label="Previous page"
      >
        Previous
      </button>

      {visiblePages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`${styles.paginationButton} ${
            currentPage === pageNum ? styles.paginationButtonActive : ""
          }`}
          aria-label={`Page ${pageNum}`}
          aria-current={currentPage === pageNum ? "page" : undefined}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
