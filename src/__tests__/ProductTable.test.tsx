import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductTable } from "../components/ProductTable";
import type { Product, Property } from "@/lib/types";

describe("ProductTable", () => {
  const properties: Property[] = [
    { id: 0, name: "Product Name", type: "string" },
    { id: 1, name: "color", type: "string" },
    { id: 2, name: "weight (oz)", type: "number" },
  ];
  const products: Product[] = [
    {
      id: 1,
      property_values: [
        { property_id: 0, value: "Test Product" },
        { property_id: 1, value: "red" },
        { property_id: 2, value: 10 },
      ],
    },
    {
      id: 2,
      property_values: [
        { property_id: 0, value: "Another Product" },
        { property_id: 1, value: "blue" },
        { property_id: 2, value: 5 },
      ],
    },
  ];

  it("renders table headers based on properties", () => {
    render(<ProductTable products={products} properties={properties} />);
    expect(screen.getByText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByText(/color/i)).toBeInTheDocument();
    expect(screen.getByText(/weight \(oz\)/i)).toBeInTheDocument();
  });

  it("renders product values in correct columns", () => {
    render(<ProductTable products={products} properties={properties} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("red")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Another Product")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows 'No products found.' when products is empty", () => {
    render(<ProductTable products={[]} properties={properties} />);
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });
});
