import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { Property } from "@/lib/types";

interface PropertySelectProps {
  properties: Property[];
  value: number | null;
  onChange: (val: number | null) => void;
}

export const PropertySelect: React.FC<PropertySelectProps> = ({
  properties,
  value,
  onChange,
}) => (
  <Select
    value={value !== null ? String(value) : ""}
    onValueChange={(val) => onChange(val ? Number(val) : null)}
  >
    <SelectTrigger className="min-w-[160px]" data-testid="property-select">
      <SelectValue placeholder="Select a Property..." />
    </SelectTrigger>
    <SelectContent>
      {properties.map((p) => (
        <SelectItem data-testid={String(p.id)} key={p.id} value={String(p.id)}>
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
