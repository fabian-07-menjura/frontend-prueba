import { ProductsResponseSchema } from "@/src/schemas";
import BusosCard from "@/components/busos/busosCard";
import Carritocompra from "@/components/cardCarrito/carritocompra";

async function traerBusos() {
  const url = `${process.env.API_URL}/tienda/busos `;
  const req = await fetch(url);
  const json = await req.json();
  const productos = ProductsResponseSchema.parse(json);
  return productos;
}

export default async function Busos() {
  const busos = await traerBusos();
  console.log(busos);
  return (
    <>
      <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
        <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {busos.map((e) => (
              <BusosCard key={e.id} buso={e} />
            ))}
          </div>
        </div>
        <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-white ">
          <Carritocompra />
        </aside>
      </main>
    </>
  );
}
