import styles from "./styles.module.css";
import { TableHeaderProps } from "./types";

const TableHeader = ({ headers }: TableHeaderProps): JSX.Element => (
  <thead>
    <tr className={styles.tableHeader}>
      {headers.map((header) => (
        <th key={header.key} className={styles.tableHeaderCell} scope="col">
          {header.label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
