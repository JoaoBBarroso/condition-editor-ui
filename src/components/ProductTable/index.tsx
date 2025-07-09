import React from "react";
import type { Product, Property } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductTableProps {
  products: Product[];
  properties: Property[];
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  properties,
}) => {
  return (
    <div className="overflow-x-auto w-full md:w-fit mx-6 rounded-xl border border-gray-700 bg-[#23262f] shadow">
      {/* Desktop Table */}
      <table className="hidden md:table md:min-w-3xl text-sm ">
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

      {/* Mobile Cards */}
      <div className="md:hidden flex w-full flex-col gap-5 p-3">
        {products.length === 0 ? (
          <Card className="bg-gradient-to-br from-[#23262f] to-[#181a20] border border-gray-700 shadow-lg">
            <CardContent className="py-8 text-center text-gray-400 text-lg">
              No products found.
            </CardContent>
          </Card>
        ) : (
          products.map((product, idx) => (
            <Card
              key={product.id}
              className={`border-0 shadow-lg rounded-xl bg-gradient-to-br ${
                idx % 2 === 0
                  ? "from-[#23262f] to-[#23262f]/80"
                  : "from-[#181a20] to-[#23262f]/80"
              }`}
            >
              <CardHeader className="px-6 pt-5 pb-2">
                <CardTitle className="text-lg font-bold text-gray-100 flex items-center gap-2">
                  Product #{idx + 1}
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  ID: {product.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col divide-y divide-gray-800 px-6 pb-5">
                {properties.map((prop) => {
                  const val = product.property_values.find(
                    (pv) => pv.property_id === prop.id,
                  )?.value;
                  return (
                    <div
                      key={prop.id}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="font-medium text-gray-300">
                        {prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}
                      </span>
                      <span className="text-gray-100 text-right max-w-[60%] truncate">
                        {val !== undefined ? (
                          String(val)
                        ) : (
                          <span className="italic text-gray-500">—</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
