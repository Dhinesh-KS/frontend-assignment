import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Table from "../index";
import "@testing-library/jest-dom/vitest";
import Pagination from "../Pagination";
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

  it("applies custom className", () => {
    const { container } = render(
      <Table
        headers={mockHeaders}
        data={mockData}
        renderRow={mockRenderRow}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        className="custom-class"
      />
    );

    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});

describe("Pagination Component", () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correct number of page buttons", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
        maxVisiblePages={5}
      />
    );

    expect(screen.getAllByRole("button")).toHaveLength(7); // 5 page buttons + Previous + Next
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).not.toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );

    expect(screen.getByLabelText("Previous page")).not.toBeDisabled();
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("handles page changes correctly", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(1);
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
