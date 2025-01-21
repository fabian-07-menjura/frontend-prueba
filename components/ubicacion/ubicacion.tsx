import { FC } from "react";
import UbicacionClient from "./ubicacionClient";

const GoogleMapWithSearchServer: FC = () => {
  return (
    <div>
      <div id="map-container">
        <UbicacionClient />
      </div>
    </div>
  );
};

export default GoogleMapWithSearchServer;
