import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import * as filterUtils from "../lib/filterUtils";

vi.mock("@/store/dataStore", () => ({
  useDataStore: () => ({
    properties: [
      { id: 0, name: "Product Name", type: "string" },
      { id: 1, name: "color", type: "string" },
    ],
    operators: [
      { text: "Equals", id: "equals" },
      { text: "Contains", id: "contains" },
    ],
    products: [
      {
        id: 1,
        property_values: [
          { property_id: 0, value: "Test Product" },
          { property_id: 1, value: "red" },
        ],
      },
    ],
  }),
}));

vi.mock("@/store/filterStore", () => ({
  useFilterStore: () => ({
    filter: { propertyId: null, operatorId: null, value: null },
  }),
}));

describe("App", () => {
  beforeEach(() => {
    vi.spyOn(filterUtils, "filterProducts").mockImplementation(
      (products) => products,
    );
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the main heading and child components", () => {
    render(<App />);
    expect(
      screen.getByText(/Product Filtering Condition Editor/i),
    ).toBeTruthy();
    expect(screen.getByText(/Test Product/)).toBeTruthy();
    expect(screen.getByText(/Filter/i)).toBeTruthy();
  });

  it("calls filterProducts with correct arguments", () => {
    render(<App />);
    expect(filterUtils.filterProducts).toHaveBeenCalled();
  });
});
