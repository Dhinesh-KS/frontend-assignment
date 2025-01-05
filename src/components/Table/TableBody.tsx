import { TableBodyProps } from "./types";

const TableBody = ({ data, renderRow }: TableBodyProps): JSX.Element => (
  <tbody>{data.map(renderRow)}</tbody>
);
export default TableBody;
