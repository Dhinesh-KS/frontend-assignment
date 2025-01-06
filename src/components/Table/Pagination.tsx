import { useMemo } from "react";
import styles from "./styles.module.css";
import { PaginationProps } from "./types";

const PAGE_SIZE_OPTIONS = [5, 10, 15];

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
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

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      className={styles.paginationContainer}
      role="navigation"
      aria-label="Pagination"
    >
      <div className={styles.paginationControls}>
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

      <div className={styles.paginationInfo}>
        <div className={styles.itemsPerPageContainer}>
          <label htmlFor="itemsPerPage" className={styles.itemsPerPageLabel}>
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              onItemsPerPageChange(newValue);
              onPageChange(1); // Reset to first page when changing items per page
            }}
            className={styles.itemsPerPageSelect}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.itemsInfo}>
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>
      </div>
    </div>
  );
};

export default Pagination;
