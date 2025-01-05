import Pagination from "./Pagination";
import styles from "./styles.module.css";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { TableProps } from "./types";

const Table = ({
  headers,
  data,
  renderRow,
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showPagination = true,
}: TableProps): JSX.Element => (
  <div className={styles.wrapper}>
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table} role="table">
        <TableHeader headers={headers} />
        <TableBody data={data} renderRow={renderRow} />
      </table>
    </div>
    {showPagination && totalPages > 1 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    )}
  </div>
);

export default Table;
