import Link from "next/link";
import React from "react";
import "leaflet/dist/leaflet.css";
import GoogleMapComponent from "@/components/ubicacion/ubicacion";

export default function Home() {
  return (
    <>
      <div className="text-center">
        <Link
          href={`/busos`}
          className="bg-black text-white hover:text-green-400 font-bold p-5 m-20"
        >
          Busos
        </Link>
      </div>
      <br />
      <br />
      <br />
      <div>
        <GoogleMapComponent />
      </div>
    </>
  );
}
