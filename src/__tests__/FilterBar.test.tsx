import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { FilterBar } from "@/components/FilterBar";
import userEvent from "@testing-library/user-event";
import type { Operator, Property } from "@/lib/types";

vi.mock("@/store/filterStore", () => {
  let filter = { propertyId: null, operatorId: null, value: null };
  return {
    useFilterStore: () => ({
      filter,
      setFilter: vi.fn((f) => (filter = f)),
      clearFilter: vi.fn(
        () => (filter = { propertyId: null, operatorId: null, value: null }),
      ),
    }),
  };
});

const properties: Property[] = [
  { id: 0, name: "Product Name", type: "string" },
  { id: 1, name: "color", type: "string" },
  { id: 2, name: "weight (oz)", type: "number" },
  {
    id: 3,
    name: "category",
    type: "enumerated",
    values: ["tools", "electronics"],
  },
];
const operators: Operator[] = [
  { text: "Equals", id: "equals" },
  { text: "Contains", id: "contains" },
  { text: "Is any of", id: "in" },
  { text: "Has any value", id: "any" },
  { text: "Has no value", id: "none" },
];

describe("FilterBar", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("renders property and operator selects", () => {
    render(<FilterBar properties={properties} operators={operators} />);
    expect(screen.getByText(/Select a Property/i)).toBeInTheDocument();
    expect(screen.getByText(/Select an Operator/i)).toBeInTheDocument();
  });

  it("calls clearFilter when Clear button is clicked", async () => {
    render(<FilterBar properties={properties} operators={operators} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Clear/i }));

    expect(screen.getByTestId("property-select")).toBeInTheDocument();
    expect(screen.getByTestId("operator-select")).toBeInTheDocument();
  });
});

// For this tests, the explanation as to why I created diferent it actions is on README.md
// This is to ensure that the user can select a property, then an operator, and finally
// that the correct input is rendered based on the property and operator combination.
describe("FilterBar", () => {
  const user = userEvent.setup();
  it("selects a property correctly", async () => {
    render(<FilterBar properties={properties} operators={operators} />);

    // Open property select
    const propertySelect = await screen.findByTestId("property-select");
    await user.click(propertySelect);

    // Wait for and select the property option (portal)
    const optionProperty = await screen.findByTestId("1");
    await user.click(optionProperty);
  });

  it("...then selects a operator correctly", async () => {
    render(<FilterBar properties={properties} operators={operators} />);

    // Open operator select
    const operatorSelect = await screen.findByTestId("operator-select");
    await user.click(operatorSelect);

    // Wait for and select the operator option (portal)
    const operatorOption = await screen.findByTestId("equals");
    await user.click(operatorOption);
  });

  it("...and finally renders a textbox because of the operator + property combination", async () => {
    render(<FilterBar properties={properties} operators={operators} />);

    waitFor(() => {
      expect(screen.findByText("Color")).toBeInTheDocument();
      expect(screen.findByText("Equals")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });
});
