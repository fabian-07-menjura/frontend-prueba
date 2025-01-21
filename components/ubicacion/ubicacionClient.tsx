// components/GoogleMapWithSearchClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const initialCenter = { lat: 4.711, lng: -74.0721 }; // Bogotá

// 5 ubicaciones en Colombia
const locations = [
  { lat: 4.711, lng: -74.0721, label: "Bogotá" },
  { lat: 6.2442, lng: -75.5812, label: "Medellín" },
  { lat: 3.4516, lng: -76.532, label: "Cali" },
  { lat: 10.391, lng: -75.4795, label: "Cartagena" },
  { lat: 11.0045, lng: -74.8024, label: "Barranquilla" },
];

const GoogleMapWithSearchClient: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [center, setCenter] = useState(initialCenter);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // Estado para saber si Google Maps está cargado

  useEffect(() => {
    // Verificar si la variable google está disponible
    if (typeof window !== "undefined" && window.google) {
      setGoogleMapsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (googleMapsLoaded && window.google && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: "CO" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCenter({ lat, lng });

          // Mover marcador o crear uno nuevo
          if (marker) {
            marker.setPosition(place.geometry.location);
          } else {
            const newMarker = new google.maps.Marker({
              position: place.geometry.location,
              map: map,
            });
            setMarker(newMarker);
          }

          // Zoom al lugar seleccionado
          if (map) {
            map.setZoom(12); // Ajustar el valor del zoom según lo necesites
            map.panTo(place.geometry.location); // Centra el mapa en la nueva ubicación
          }
        } else {
          alert("No se encontró la ubicación seleccionada.");
        }
      });
    }
  }, [googleMapsLoaded, map, marker]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe una ciudad"
        className="border p-2 w-full rounded mb-4"
      />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
        onLoad={() => setGoogleMapsLoaded(true)} // Indicar que la API está cargada
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          onLoad={(map) => setMap(map)}
        >
          {/* Marcadores de las 5 ubicaciones en Colombia */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              label={location.label}
            />
          ))}

          {/* Validar si la posición del marcador es válida */}
          {marker && marker.getPosition() && (
            <Marker position={marker.getPosition()!} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapWithSearchClient;
