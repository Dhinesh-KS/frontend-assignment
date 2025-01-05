export interface TableHeader {
  key: string;
  label: string;
}

export interface TableProps {
  headers: TableHeader[];
  data: any[];
  renderRow: (item: any, index: number) => JSX.Element;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPagination?: boolean;
}

export interface TableHeaderProps {
  headers: TableHeader[];
}

export interface TableBodyProps {
  data: any[];
  renderRow: (item: any, index: number) => JSX.Element;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}
