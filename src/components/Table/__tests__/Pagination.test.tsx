import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 10,
    totalItems: 50,
    onPageChange: vi.fn(),
    onItemsPerPageChange: vi.fn(),
    maxVisiblePages: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all pagination elements correctly", () => {
    render(<Pagination {...defaultProps} />);

    // Navigation buttons
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();

    // Page buttons
    expect(screen.getAllByRole("button")).toHaveLength(7); // 5 page buttons + Previous + Next

    // Items per page select
    expect(screen.getByLabelText("Items per page:")).toBeInTheDocument();

    // Items info text
    expect(
      screen.getByText("Showing 1 to 10 of 50 entries")
    ).toBeInTheDocument();
  });

  it("renders correct items per page options", () => {
    render(<Pagination {...defaultProps} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options.map((option) => option.textContent)).toEqual([
      "5",
      "10",
      "15",
    ]);
  });

  it("disables Previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).not.toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    expect(screen.getByLabelText("Previous page")).not.toBeDisabled();
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("handles page navigation correctly", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={2}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("handles items per page changes correctly", () => {
    const onItemsPerPageChange = vi.fn();
    const onPageChange = vi.fn();

    render(
      <Pagination
        {...defaultProps}
        onItemsPerPageChange={onItemsPerPageChange}
        onPageChange={onPageChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "15" } });

    expect(onItemsPerPageChange).toHaveBeenCalledWith(15);
    expect(onPageChange).toHaveBeenCalledWith(1); // Should reset to page 1
  });

  it("shows correct item range information", () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={2}
        itemsPerPage={10}
        totalItems={25}
      />
    );

    expect(
      screen.getByText("Showing 11 to 20 of 25 entries")
    ).toBeInTheDocument();
  });

  it("handles last page item range correctly", () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        itemsPerPage={10}
        totalItems={25}
      />
    );

    expect(
      screen.getByText("Showing 21 to 25 of 25 entries")
    ).toBeInTheDocument();
  });

  it("limits visible page buttons according to maxVisiblePages", () => {
    render(
      <Pagination {...defaultProps} totalPages={10} maxVisiblePages={3} />
    );

    const pageButtons = screen
      .getAllByRole("button")
      .filter(
        (button) => !["Previous", "Next"].includes(button.textContent || "")
      );
    expect(pageButtons).toHaveLength(3);
  });

  it("updates visible pages when current page changes", () => {
    const { rerender } = render(
      <Pagination
        {...defaultProps}
        currentPage={1}
        totalPages={10}
        maxVisiblePages={3}
      />
    );

    let pageButtons = screen
      .getAllByRole("button")
      .filter(
        (button) => !["Previous", "Next"].includes(button.textContent || "")
      );
    expect(pageButtons.map((button) => button.textContent)).toEqual([
      "1",
      "2",
      "3",
    ]);

    rerender(
      <Pagination
        {...defaultProps}
        currentPage={5}
        totalPages={10}
        maxVisiblePages={3}
      />
    );

    pageButtons = screen
      .getAllByRole("button")
      .filter(
        (button) => !["Previous", "Next"].includes(button.textContent || "")
      );
    expect(pageButtons.map((button) => button.textContent)).toEqual([
      "4",
      "5",
      "6",
    ]);
  });
});
