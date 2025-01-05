import { render, screen } from "@testing-library/react";

import { describe, expect, test } from "vitest";
import ProjectInsights from "..";
import "@testing-library/jest-dom/vitest";

describe("ProjectInsights Component", () => {
  test("shows loading state initially", () => {
    render(<ProjectInsights />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
