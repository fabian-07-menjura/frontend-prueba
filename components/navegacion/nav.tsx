import Link from "next/link";

export default async function MainNav() {
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
      <div className="flex justify-center">
        {" "}
        <h1 className="text-3xl font-extrabold text-white">
          SHOP {""}
          <span className="text-orange-400 text-xl ">Tienda / Fabian</span>
        </h1>
      </div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
        <Link
          href={`/`}
          className="text-white hover:text-green-400 font-bold p-2"
        >
          Home
        </Link>
        <Link
          href={`/busos`}
          className="text-white hover:text-green-400 font-bold p-2"
        >
          Busos
        </Link>
        <Link
          href={`/ubicacion`}
          className="text-white hover:text-green-400 font-bold p-2"
        >
          Ubicacion
        </Link>
      </nav>
    </header>
  );
}
