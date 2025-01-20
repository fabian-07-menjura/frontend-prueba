import { z } from "zod";

// Esquema para un producto
export const EsquemaBusos = z.object({
  id: z.number(),
  nombre: z.string(),
  imagen: z.string(),
  precio: z.string().transform((val) => parseFloat(val)),
  cantidad: z.string().transform((val) => parseInt(val, 10)),
  categoria: z.string().transform((val) => parseInt(val, 10)),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProductsResponseSchema = z.array(EsquemaBusos);

// carrito de compras

const EsquemaCarritoCompras = EsquemaBusos.pick({
  nombre: true,
  imagen: true,
  precio: true,
  categoria: true,
  cantidad: true,
}).extend({
  IdProducto: z.number(),
  cantidadcomprar: z.number(),
});

export const CarritoDeComprasEsquema = z.array(EsquemaCarritoCompras);

export type Producto = z.infer<typeof EsquemaBusos>;
export type CarritoCompras = z.infer<typeof CarritoDeComprasEsquema>;
export type CartItem = z.infer<typeof EsquemaCarritoCompras>;
