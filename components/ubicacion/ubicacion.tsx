"use client";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const initialCenter = { lat: 4.711, lng: -74.0721 }; // Bogotá

const locations = [
  { lat: 4.711, lng: -74.0721, label: "Bogotá" },
  { lat: 10.391, lng: -75.4795, label: "Cartagena" },
  { lat: 6.2442, lng: -75.5812, label: "Medellín" },
  { lat: 3.4516, lng: -76.532, label: "Cali" },
  { lat: 11.0045, lng: -74.8024, label: "Barranquilla" },
];

const GoogleMapWithSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [center, setCenter] = useState(initialCenter);

  useEffect(() => {
    if (window.google) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current!,
        {
          componentRestrictions: { country: "CO" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          alert("No se encontró la ubicación seleccionada.");
          return;
        }

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
      });
    }
  }, [map, marker]);

  const handleSearchClick = async () => {
    if (!inputRef.current) return;

    const query = inputRef.current.value;
    if (!query) {
      alert("Por favor, ingresa una ciudad.");
      return;
    }

    const service = new google.maps.places.PlacesService(map!);
    service.textSearch({ query: query, region: "CO" }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const place = results[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCenter({ lat, lng });

        if (marker) {
          marker.setPosition(place.geometry.location);
        } else {
          const newMarker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
          });
          setMarker(newMarker);
        }
      } else {
        alert("No se encontró la ciudad.");
      }
    });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe una ciudad"
        className="border p-2 w-full rounded mb-4"
      />
      <button
        onClick={handleSearchClick}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Buscar
      </button>

      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          onLoad={(map) => setMap(map)}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              label={location.label}
            />
          ))}
          {marker && <Marker position={marker.getPosition()} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapWithSearch;
