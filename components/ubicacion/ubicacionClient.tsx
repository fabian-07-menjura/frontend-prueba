"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const initialCenter = { lat: 4.711, lng: -74.0721 };

// 5 ubicaciones de la tienda FabianShop
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
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
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
          setSelectedAddress(place.formatted_address || "");

          if (marker) {
            marker.setPosition(place.geometry.location);
          } else {
            const newMarker = new google.maps.Marker({
              position: place.geometry.location,
              map: map,
            });
            setMarker(newMarker);
          }

          if (map) {
            map.setZoom(12);
            map.panTo(place.geometry.location);
          }
        } else {
          alert("No se encontró la ubicación seleccionada.");
        }
      });
    }
  }, [googleMapsLoaded, map, marker]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();
      setCenter({ lat: clickedLat, lng: clickedLng });

      if (marker) {
        marker.setPosition(event.latLng);
      } else {
        const newMarker = new google.maps.Marker({
          position: event.latLng,
          map: map,
        });
        setMarker(newMarker);
      }

      // Obtener la dirección a partir de las coordenadas
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          setSelectedAddress(results[0].formatted_address);
          if (inputRef.current) {
            inputRef.current.value = results[0].formatted_address;
          }
        } else {
          console.error("Geocoder failed due to: " + status);
          setSelectedAddress(`${clickedLat}, ${clickedLng}`);
          if (inputRef.current) {
            inputRef.current.value = `${clickedLat}, ${clickedLng}`;
          }
        }
      });

      if (map) {
        map.setZoom(12);
        map.panTo(event.latLng);
      }
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe una ciudad o selecciona en el mapa"
        className="border p-2 w-full rounded mb-4"
        value={selectedAddress}
        onChange={(e) => setSelectedAddress(e.target.value)}
      />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
        onLoad={() => setGoogleMapsLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          onLoad={(map) => setMap(map)}
          onClick={handleMapClick}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              label={location.label}
            />
          ))}

          {marker && marker.getPosition() && (
            <Marker position={marker.getPosition()!} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapWithSearchClient;
