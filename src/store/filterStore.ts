import { create } from "zustand";
import type { Filter } from "../lib/types";

export interface FilterState {
  filter: Filter;
  setFilter: (f: Filter) => void;
  clearFilter: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filter: {
    propertyId: null,
    operatorId: null,
    value: null,
  },
  setFilter: (f: Filter) => set({ filter: f }),
  clearFilter: () =>
    set({ filter: { propertyId: null, operatorId: null, value: null } }),
}));
