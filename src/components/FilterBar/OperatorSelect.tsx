import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { Operator, OperatorId } from "@/lib/types";

interface OperatorSelectProps {
  operators: Operator[];
  value: OperatorId | null;
  onChange: (val: OperatorId | null) => void;
  disabled?: boolean;
}

export const OperatorSelect: React.FC<OperatorSelectProps> = ({
  operators,
  value,
  onChange,
  disabled,
}) => (
  <Select
    value={value ?? ""}
    onValueChange={(val) => onChange(val as OperatorId)}
    disabled={disabled}
  >
    <SelectTrigger className="min-w-[160px]" data-testid="operator-select">
      <SelectValue placeholder="Select an Operator..." />
    </SelectTrigger>
    <SelectContent>
      {operators.map((op) => (
        <SelectItem data-testid={op.id} key={op.id} value={op.id}>
          {op.text}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
