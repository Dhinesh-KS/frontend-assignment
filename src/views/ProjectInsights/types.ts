export interface Project {
  pledged: number;
  goal: number;
  [key: string]: any;
}

export interface TableConfig {
  ITEMS_PER_PAGE: number;
  HEADERS: Array<{
    key: string;
    label: string;
  }>;
}

export interface ApiResponse {
  success: boolean;
  data: Project[];
  error?: string;
}

export interface ErrorMessageProps {
  message: string;
}
