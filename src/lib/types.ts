export type Product = {
  id: number;
  property_values: { property_id: number; value: string | number }[];
};

export type PropertyType = "string" | "number" | "enumerated";

export type Property = {
  id: number;
  name: string;
  type: PropertyType;
  values?: string[];
};

export type OperatorId =
  | "equals"
  | "greater_than"
  | "less_than"
  | "any"
  | "none"
  | "in"
  | "contains";

export type Operator = {
  text: string;
  id: OperatorId;
};

export type Filter = {
  propertyId: number | null;
  operatorId: OperatorId | null;
  value: string | number | string[] | null;
};
