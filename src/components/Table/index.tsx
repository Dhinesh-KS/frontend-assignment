import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import styles from "./styles.module.css";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { TableProps } from "./types";

const Table = ({
  headers,
  data,
  renderRow,
  className = "",
  initialItemsPerPage = 10,
}: TableProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const paginationData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return {
      currentItems: data.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(data.length / itemsPerPage),
    };
  }, [data, currentPage, itemsPerPage]);

  const { currentItems, totalPages } = paginationData;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.tableContainer} ${className}`}>
        <table className={styles.table} role="table">
          <TableHeader headers={headers} />
          <TableBody data={currentItems} renderRow={renderRow} />
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default Table;
