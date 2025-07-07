import { useMemo } from "react";
import { filterProducts } from "./lib/filterUtils";
import { FilterBar } from "@/components/FilterBar";
import { ProductTable } from "@/components/ProductTable";
import { useFilterStore } from "@/store/filterStore";
import { useDataStore } from "@/store/dataStore";

function App() {
  const { properties, operators, products } = useDataStore((state) => state);
  const filter = useFilterStore((state) => state.filter);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, properties, filter);
  }, [products, properties, filter]);

  return (
    <div className="min-h-screen w-full bg-[#181a20] flex flex-col items-center py-10">
      <div className="flex flex-col justify-center items-center w-full p-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Product Filtering Condition Editor
        </h1>
        <FilterBar properties={properties} operators={operators} />
        <ProductTable products={filteredProducts} properties={properties} />
      </div>
    </div>
  );
}

export default App;
