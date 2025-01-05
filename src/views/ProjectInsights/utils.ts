import { TableConfig } from "./types";

export const TABLE_CONFIG: TableConfig = {
  ITEMS_PER_PAGE: 5,
  HEADERS: [
    { key: "sno", label: "S.No." },
    { key: "percentageFunded", label: "Percentage Funded" },
    { key: "amountPledged", label: "Amount Pledged" },
  ],
};
