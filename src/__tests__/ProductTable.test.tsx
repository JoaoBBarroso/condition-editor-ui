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

  it("renders table headers and product values, or empty message", () => {
    // Renders headers
    render(<ProductTable products={products} properties={properties} />);
    [
      "Product Name",
      "Color",
      "Weight (oz)",
      "Test Product",
      "red",
      "10",
      "Another Product",
      "blue",
      "5",
    ].forEach((text) => {
      expect(screen.getAllByText(text)[0]).toBeInTheDocument();
    });
    // Renders empty message
    render(<ProductTable products={[]} properties={properties} />);
    expect(screen.getAllByText(/No products found/i)[0]).toBeInTheDocument();
  });
});
