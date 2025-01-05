import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "../index";
import "@testing-library/jest-dom/vitest";

describe("Table Component", () => {
  const mockHeaders = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
  ];

  const mockData = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];

  const mockRenderRow = (item: any) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  );

  it("renders table with headers and data", () => {
    render(
      <Table
        headers={mockHeaders}
        data={mockData}
        renderRow={mockRenderRow}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Project 1")).toBeInTheDocument();
  });

  it("hides pagination when showPagination is false", () => {
    render(
      <Table
        headers={mockHeaders}
        data={mockData}
        renderRow={mockRenderRow}
        currentPage={1}
        totalPages={2}
        onPageChange={() => {}}
        showPagination={false}
      />
    );

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
