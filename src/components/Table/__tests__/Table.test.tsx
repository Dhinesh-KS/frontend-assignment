import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "../index";
import "@testing-library/jest-dom/vitest";
import TableBody from "../TableBody";
import TableHeader from "../TableHeader";

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
        initialItemsPerPage={5}
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
        showPagination={false}
        initialItemsPerPage={5}
      />
    );

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Table
        headers={mockHeaders}
        data={mockData}
        renderRow={mockRenderRow}
        className="custom-class"
        initialItemsPerPage={5}
      />
    );

    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});

describe("TableHeader Component", () => {
  const mockHeaders = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
  ];

  it("renders all headers correctly", () => {
    render(<TableHeader headers={mockHeaders} />);

    mockHeaders.forEach((header) => {
      expect(screen.getByText(header.label)).toBeInTheDocument();
    });
  });

  it("applies correct ARIA attributes", () => {
    render(<TableHeader headers={mockHeaders} />);

    const headerCells = screen.getAllByRole("columnheader");
    expect(headerCells).toHaveLength(mockHeaders.length);
    headerCells.forEach((cell) => {
      expect(cell).toHaveAttribute("scope", "col");
    });
  });
});

describe("TableBody Component", () => {
  const mockData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  const mockRenderRow = (item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
    </tr>
  );

  it("renders all rows correctly", () => {
    render(<TableBody data={mockData} renderRow={mockRenderRow} />);

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
