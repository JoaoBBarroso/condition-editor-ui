import type { Product, Property, Filter } from "@/lib/types";

// Map property type to valid operators
export const propertyTypeToOperators: Record<string, string[]> = {
  string: ["equals", "any", "none", "in", "contains"],
  number: ["equals", "greater_than", "less_than", "any", "none", "in"],
  enumerated: ["equals", "any", "none", "in"],
};

// Filtering logic
export const filterProducts = (
  products: Product[],
  properties: Property[],
  filter: Filter, // from global state
): Product[] => {
  if (filter.propertyId == null || !filter.operatorId) return products;
  const property = properties.find((p) => p.id === filter.propertyId);
  if (!property) return products;

  return products.filter((product) => {
    const propVal = product.property_values.find(
      (pv) => pv.property_id === property.id,
    )?.value;
    
    switch (filter.operatorId) {
      case "equals":
        return propVal === filter.value;
      case "greater_than":
        return (
          typeof propVal === "number" &&
          typeof filter.value === "number" &&
          propVal > filter.value
        );
      case "less_than":
        return (
          typeof propVal === "number" &&
          typeof filter.value === "number" &&
          propVal < filter.value
        );
      case "any":
        return propVal !== undefined && propVal !== null && propVal !== "";
      case "none":
        return propVal === undefined || propVal === null || propVal === "";
      case "in":
        if (typeof filter.value === "string") {
          const values = filter.value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean);
          return values.some((v) => String(v) === String(propVal));
        }
        return false;
      case "contains":
        return (
          typeof propVal === "string" &&
          typeof filter.value === "string" &&
          propVal.toLowerCase().includes(filter.value.toLowerCase())
        );
      default:
        return true;
    }
  });
};
