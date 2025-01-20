"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Coordenadas iniciales de Bogotá, Colombia
const initialCenter = { lat: 4.711, lng: -74.0721 };

// Lista de ubicaciones para los marcadores
const locations = [
  { lat: 4.711, lng: -74.0721, label: "Bogotá" }, // Bogotá
  { lat: 10.391, lng: -75.4795, label: "Cartagena" }, // Cartagena
  { lat: 6.2442, lng: -75.5812, label: "Medellín" }, // Medellín
  { lat: 3.4516, lng: -76.532, label: "Cali" }, // Cali
  { lat: 11.0045, lng: -74.8024, label: "Barranquilla" }, // Barranquilla
];

const GoogleMapWithAutocomplete: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null); // Referencia al input de búsqueda
  const [center, setCenter] = useState(initialCenter); // Centro del mapa
  const [selectedPlace, setSelectedPlace] = useState<string>(""); // Lugar seleccionado
  const [markerPosition, setMarkerPosition] = useState(initialCenter); // Posición del marcador
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false); // Estado para verificar si Google Maps está cargado

  useEffect(() => {
    // Verificar si google.maps está disponible
    if (window.google) {
      setIsGoogleMapsLoaded(true); // Establecer el estado a true cuando se cargue Google Maps
    }
  }, []);

  useEffect(() => {
    if (!isGoogleMapsLoaded || !inputRef.current) return;

    // Crear el objeto Autocomplete solo si google.maps está cargado
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "CO" },
    });

    // Manejar el evento cuando se selecciona un lugar
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
        setSelectedPlace(place.formatted_address || "Ubicación no disponible");
      }
    });
  }, [isGoogleMapsLoaded]);

  return (
    <div>
      {/* Input para buscar lugares */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe un lugar"
        className="border p-2 w-full rounded mb-4"
      />

      {/* Mapa de Google */}
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6} // Zoom ajustado para mostrar todo el país
        >
          {/* Marcadores para cada ubicación */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              label={location.label}
            />
          ))}

          {/* Marcador en la ubicación seleccionada */}
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScript>

      {/* Mostrar la dirección seleccionada */}
      {selectedPlace && (
        <div className="mt-4">
          <h3>Lugar seleccionado:</h3>
          <p>{selectedPlace}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapWithAutocomplete;
