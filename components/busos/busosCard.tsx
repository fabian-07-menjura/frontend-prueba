import { Producto } from "@/src/schemas";
import { formatDinero } from "@/src/utils";
import Image from "next/image";
import BtnAgregar from "./btnAgregar";

export default function BusosCard({ buso }: { buso: Producto }) {
  return (
    <div className="rounded bg-white shadow relative p-5">
      <div>
        <Image
          src={`${process.env.API_URL}/public/imagenes/${buso.imagen}.webp`}
          alt={`imagen del producto ${buso.nombre}`}
          width={380}
          height={204}
        />
        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold text-gray-600">{buso.nombre}</h3>
          <p className="text-gray-500">Disponibles: {buso.cantidad}</p>
          <p className="text-2xl font-extrabold  text-gray-900">
            {formatDinero(buso.precio)}
          </p>
        </div>
      </div>
      <BtnAgregar buso={buso} />
    </div>
  );
}
