import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Property, OperatorId } from "@/lib/types";

type ValueType = string | number | string[] | null;

interface ValueInputProps {
  property: Property | undefined;
  operatorId: OperatorId | null;
  value: ValueType;
  setValue: (val: ValueType) => void;
}

export const ValueInput: React.FC<ValueInputProps> = ({
  property,
  operatorId,
  value,
  setValue,
}) => {
  const renderSelectInput = (
    property: Property,
    value: ValueType,
    setValue: (val: ValueType) => void,
  ) => {
    if (property.type === "enumerated" && property.values) {
      return (
        <Select
          value={typeof value === "string" ? value : ""}
          onValueChange={(val) => setValue(val)}
        >
          <SelectTrigger
            className="min-w-[180px]"
            data-testid="enumerated-select"
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {property.values.map((v) => (
              <SelectItem data-testid={v} key={v} value={v}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    return null;
  };

  const renderTextInput = (value: ValueType, placeholder?: string) => {
    return (
      <Input
        type="text"
        placeholder={placeholder ?? "Enter value..."}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => setValue(e.target.value)}
        className="min-w-[180px]"
      />
    );
  };

  // If no property is selected or operator is not set, return early
  if (!property || operatorId == null || ["any", "none"].includes(operatorId)) {
    return null;
  }

  switch (true) {
    case operatorId === "in": {
      // For "in" operator, we allow multiple values
      if (property.type === "enumerated" && property.values) {
        return renderSelectInput(property, value, setValue);
      }
      // For other types "is any of", we allow comma-separated values
      return renderTextInput(value, "Enter values, comma separated");
    }
    case property.type === "enumerated" && !!property.values: {
      return renderSelectInput(property, value, setValue);
    }
    case property.type === "number": {
      return (
        <Input
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(e) =>
            setValue(e.target.value === "" ? null : Number(e.target.value))
          }
          className="min-w-[120px]"
        />
      );
    }
    default:
      return renderTextInput(value);
  }
};
