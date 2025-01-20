import GoogleMapWithAutocomplete from "@/components/ubicacion/ubicacion";

export default function Ubicacion() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-900 text-center">
        Encuentra nuestros Puntos de venta
      </h2>
      <br />

      <br />
      <GoogleMapWithAutocomplete />
    </div>
  );
}
