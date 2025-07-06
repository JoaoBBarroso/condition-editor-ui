import React, { useMemo } from "react";
import { useFilterStore } from "@/store/filterStore";
import type { FilterState } from "@/store/filterStore";
import type { Property, Operator, OperatorId } from "@/lib/types";
import { propertyTypeToOperators } from "../lib/filterUtils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  properties: Property[];
  operators: Operator[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  properties,
  operators,
}) => {
  const { clearFilter, filter, setFilter } = useFilterStore(
    (state: FilterState) => state,
  );

  // Get selected property and valid operators
  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === filter.propertyId),
    [properties, filter.propertyId],
  );
  const validOperatorIds = selectedProperty
    ? propertyTypeToOperators[selectedProperty.type]
    : [];
  const validOperators = operators.filter((op) =>
    validOperatorIds.includes(op.id),
  );

  // Value input rendering
  const renderValueInput = () => {
    // If no property selected or operator not set, return early
    if (!selectedProperty || filter.operatorId == null) {
      return null;
    }

    // If operator is "any" or "none", no value input needed, return early
    if (["any", "none"].includes(filter.operatorId)) return null;

    // Handle "in" operator separately
    if (filter.operatorId === "in") {
      // Multi-select for enumerated
      if (selectedProperty.type === "enumerated" && selectedProperty.values) {
        return (
          <Select
            value={filter.value as string}
            onValueChange={(vals) => setFilter({ ...filter, value: vals })}
          >
            <SelectTrigger
              className="min-w-[180px]"
              data-testid="enumerated-select"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {selectedProperty.values.map((v) => (
                <SelectItem data-testid={v} key={v} value={v}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      // For string/number, allow comma-separated input
      return (
        <Input
          type="text"
          role="textbox"
          placeholder="Enter values, comma separated"
          value={Array.isArray(filter.value) ? filter.value.join(", ") : ""}
          onChange={(e) =>
            setFilter({
              ...filter,
              value: e.target.value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean),
            })
          }
          className="min-w-[180px]"
        />
      );
    }
    if (selectedProperty.type === "enumerated" && selectedProperty.values) {
      return (
        <Select
          value={typeof filter.value === "string" ? filter.value : ""}
          onValueChange={(val) => setFilter({ ...filter, value: val })}
        >
          <SelectTrigger
            className="min-w-[180px]"
            data-testid="enumerated-select"
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {selectedProperty.values.map((v) => (
              <SelectItem data-testid={v} key={v} value={v}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    if (selectedProperty.type === "number") {
      return (
        <Input
          type="number"
          value={typeof filter.value === "number" ? filter.value : ""}
          onChange={(e) =>
            setFilter({
              ...filter,
              value: e.target.value === "" ? null : Number(e.target.value),
            })
          }
          className="min-w-[120px]"
        />
      );
    }

    return (
      <Input
        type="text"
        value={typeof filter.value === "string" ? filter.value : ""}
        onChange={(e) => setFilter({ ...filter, value: e.target.value })}
        className="min-w-[180px]"
      />
    );
  };

  return (
    <div className="flex min-w-3xl flex-wrap items-end gap-4 p-4 bg-[#23262f] text-white rounded border border-gray-700 shadow mb-6">
      <div>
        <Select
          value={filter.propertyId !== null ? String(filter.propertyId) : ""}
          onValueChange={(val) =>
            setFilter({
              propertyId: val ? Number(val) : null,
              operatorId: null,
              value: null,
            })
          }
        >
          <SelectTrigger
            className="min-w-[160px]"
            data-testid="property-select"
          >
            <SelectValue placeholder="Select a Property..." />
          </SelectTrigger>
          <SelectContent>
            {properties.map((p) => (
              <SelectItem
                data-testid={String(p.id)}
                key={p.id}
                value={String(p.id)}
              >
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          value={filter.operatorId ?? ""}
          onValueChange={(val) =>
            setFilter({
              ...filter,
              operatorId: val as OperatorId,
              value: null,
            })
          }
          disabled={filter.propertyId == null}
        >
          <SelectTrigger
            className="min-w-[160px]"
            data-testid="operator-select"
          >
            <SelectValue placeholder="Select an Operator..." />
          </SelectTrigger>
          <SelectContent>
            {validOperators.map((op) => (
              <SelectItem data-testid={op.id} key={op.id} value={op.id}>
                {op.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>{renderValueInput()}</div>
      <div className="ml-auto">
        <Button variant="default" onClick={clearFilter} type="button">
          Clear
        </Button>
      </div>
    </div>
  );
};
