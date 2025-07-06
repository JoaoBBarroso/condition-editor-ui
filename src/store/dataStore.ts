import type { Operator, Product, Property } from "@/lib/types";
import { DataStore } from "@/store/data/mockData";
import { create } from "zustand";

export interface DataState {
  properties: Property[];
  operators: Operator[];
  products: Product[];
}

export const useDataStore = create<DataState>(() => ({
  properties: DataStore.getProperties().map((p) => ({
    ...p,
    type: p.type.toLowerCase() as Property["type"],
  })),
  operators: DataStore.getOperators().map((op) => ({
    ...op,
    id: op.id.toLowerCase() as Operator["id"],
  })),
  products: DataStore.getProducts(),
}));
