"use client";
import { UseStore } from "@/src/store";
import ItemCarritoCompras from "./itemCarritoCompras";

export default function Carritocompra() {
  const contenidos = UseStore((estado) => estado.contenidos);

  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-900">Resumen de venta</h2>
      <ul
        role="list"
        className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 "
      >
        {contenidos.map((item) => (
          <ItemCarritoCompras key={item.IdProducto} item={item} />
        ))}
      </ul>
    </div>
  );
}
