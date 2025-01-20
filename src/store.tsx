import { create } from "zustand";
import { CarritoCompras, Producto } from "./schemas";
import { devtools } from "zustand/middleware";

interface Store {
  total: number;
  contenidos: CarritoCompras;
  agregarcarrito: (producto: Producto) => void;
}

export const UseStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contenidos: [],
    agregarcarrito: (producto) => {
      const { id: IdProducto, ...data } = producto;
      let contenidos: CarritoCompras = [];
      const duplicado = get().contenidos.findIndex(
        (item) => item.IdProducto === IdProducto
      );
      if (duplicado >= 0) {
        if (
          get().contenidos[duplicado].cantidadcomprar >=
          get().contenidos[duplicado].cantidad
        )
          return;
        contenidos = get().contenidos.map((item) =>
          item.IdProducto === IdProducto
            ? { ...item, cantidadcomprar: item.cantidadcomprar + 1 }
            : item
        );
      } else {
        contenidos = [
          ...get().contenidos,
          {
            ...data,
            cantidadcomprar: 1,
            IdProducto,
          },
        ];
      }
      set(() => ({
        contenidos,
      }));
    },
  }))
);
