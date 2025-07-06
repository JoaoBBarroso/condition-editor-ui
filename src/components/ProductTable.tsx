import React from "react";
import type { Product, Property } from "../lib/types";

interface ProductTableProps {
  products: Product[];
  properties: Property[];
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  properties,
}) => {
  return (
    <div className="overflow-x-auto rounded border border-gray-700 bg-[#23262f] shadow">
      <table className="md:min-w-3xl text-sm">
        <thead>
          <tr className="bg-[#181a20]">
            {properties.map((prop) => (
              <th
                key={prop.id}
                className="px-4 py-2 text-left font-semibold text-gray-200"
              >
                {prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={properties.length}
                className="px-4 py-4 text-center text-gray-400"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product, idx) => (
              <tr
                key={product.id}
                className={idx % 2 === 0 ? "bg-[#23262f]" : "bg-[#181a20]"}
              >
                {properties.map((prop) => {
                  const val = product.property_values.find(
                    (pv) => pv.property_id === prop.id,
                  )?.value;
                  return (
                    <td key={prop.id} className="px-4 py-2 text-gray-100">
                      {val !== undefined ? String(val) : ""}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
