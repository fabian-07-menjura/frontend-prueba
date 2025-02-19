import { CartItem } from "@/src/schemas";
import Image from "next/image";
import { formatDinero } from "../../src/utils";
import { UseStore } from "@/src/store";

export default function ItemCarritoCompras({ item }: { item: CartItem }) {
  const actualizarCantSelect = UseStore(
    (state) => state.actualizarCantidadSelect
  );
  const removerProducto = UseStore((state) => state.removerProducto);
  return (
    <li className="flex items-center space-x-6 py-6 relative">
      <div className="h-24 w-24">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/public/imagenes/${item.imagen}.webp`}
          width={100}
          height={100}
          alt="imagen del producto"
        />
      </div>
      <div className="flex-auto space-y-2">
        <h3 className="text-gray-900">{item.nombre}</h3>
        <p>{formatDinero(item.precio)}</p>
        <select
          className="w-32 text-center p-2 rounded-lg bg-gray-400 text-white"
          value={item.cantidadcomprar}
          onChange={(e) =>
            actualizarCantSelect(item.IdProducto, +e.target.value)
          }
        >
          {Array.from({ length: item.cantidad }, (_, index) => index + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
      </div>
      <div className="absolute top-10 -right-0">
        <button type="button" onClick={() => removerProducto(item.IdProducto)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
