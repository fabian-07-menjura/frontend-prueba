import { create } from "zustand";
import { CarritoCompras, Producto } from "./schemas";
import { devtools } from "zustand/middleware";

interface Store {
  total: number;
  contenidos: CarritoCompras;
  agregarcarrito: (producto: Producto) => void;
  actualizarCantidadSelect: (id: Producto["id"], cantidad: number) => void;
  removerProducto: (id: Producto["id"]) => void;
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
    actualizarCantidadSelect: (id, cantidadcomprar) => {
      console.log(cantidadcomprar);
      const contenidos = get().contenidos.map((item) =>
        item.IdProducto === id ? { ...item, cantidadcomprar } : item
      );
      set(() => ({ contenidos }));
    },
    removerProducto: (id) => {
      console.log("eliminando ...", id);
      const contenidos = get().contenidos.filter(
        (item) => item.IdProducto !== id
      );
      console.log(contenidos);
      set(() => ({ contenidos }));
    },
  }))
);
