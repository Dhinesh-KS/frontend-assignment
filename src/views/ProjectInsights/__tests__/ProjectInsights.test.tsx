import { render, screen, waitFor } from "@testing-library/react";

import { afterEach, describe, expect, test, vi } from "vitest";
import ProjectInsights from "..";
import "@testing-library/jest-dom/vitest";

globalThis.fetch = vi.fn();

describe("ProjectInsights Component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("shows loading state initially", () => {
    (fetch as jest.Mock).mockResolvedValueOnce(new Promise(() => {})); // Keeps the promise pending
    render(<ProjectInsights />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("displays error state", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<ProjectInsights />);
    await waitFor(
      () => {
        expect(screen.getByTestId("error-state")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
