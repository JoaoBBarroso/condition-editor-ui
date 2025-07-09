import React, { useMemo } from "react";
import { useFilterStore } from "@/store/filterStore";
import type { FilterState } from "@/store/filterStore";
import type { Property, Operator } from "@/lib/types";
import { propertyTypeToOperators } from "../../lib/filterUtils";
import { PropertySelect } from "./PropertySelect";
import { OperatorSelect } from "./OperatorSelect";
import { ValueInput } from "./ValueInput";
import { Button } from "@/components/ui/button";

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

  // Memoize the selected property to avoid unnecessary recalculations
  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === filter.propertyId),
    [properties, filter.propertyId],
  );

  // Get valid operators based on the selected property type
  // If no property is selected, default to an empty array
  const validOperatorIds = selectedProperty
    ? propertyTypeToOperators[selectedProperty.type]
    : [];

  // Filter the operators to only include those that are valid for the selected property
  // If no property is selected, validOperators will be an empty array
  const validOperators = operators.filter((op) =>
    validOperatorIds.includes(op.id),
  );

  return (
    <div className="flex w-full md:w-fit flex-col md:flex-row justify-between flex-wrap items-start gap-4 p-2 bg-[#23262f] text-white rounded-xl  border border-gray-700 mb-6">
      <div>
        <PropertySelect
          properties={properties}
          value={filter.propertyId}
          onChange={(val) =>
            setFilter({ propertyId: val, operatorId: null, value: null })
          }
        />
      </div>
      <div>
        <OperatorSelect
          operators={validOperators}
          value={filter.operatorId ?? null}
          onChange={(val) =>
            setFilter({ ...filter, operatorId: val, value: null })
          }
          disabled={filter.propertyId == null}
        />
      </div>
      <div>
        <ValueInput
          property={selectedProperty}
          operatorId={filter.operatorId ?? null}
          value={filter.value}
          setValue={(val) => setFilter({ ...filter, value: val })}
        />
      </div>
      <div className="ml-auto">
        <Button variant="default" onClick={clearFilter} type="button">
          Clear
        </Button>
      </div>
    </div>
  );
};
