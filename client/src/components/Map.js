import React, { useState, useEffect } from "react";
import { get, post } from "../utilities.js";
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from "react-leaflet";
import { map_1980 } from "./1980.js";
// Import required D3 modules
import { interpolateYlGnBu } from "d3";
import { scaleLinear } from "d3";
import Legend from "./modules/Legend.js";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = () => {
  const [map, setMap] = useState(null);
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    const body = { name: "neighborhood_tract_1980" };
    // post("/api/tract", map_1980); // use this code to post new data to mongoDB

    get("/api/allGeoJSON", body)
      .then((output) => {
        setMap(output);
        // creating geoJSON object to visualize map data once we have it from api call
        setGeojson(<GeoJSON data={output} style={{ fillColor: "red" }} />);
      })
      .catch((error) => {
        console.error("Error while getting GeoJSON data from MongoDB", error);
      });
  }, []);
  return (
    <div className="Map">
      <MapContainer
        center={[42.35346337378607, -71.14454379278231]}
        zoom={13}
        scrollWheelZoom={true}
        className="Map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geojson}

        {/* <Marker position={[42.35346337378607, -71.14454379278231]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* <Legend legendItems={map_1980.features} allColors={allColors} /> */}
      </MapContainer>
    </div>
  );
};

export default Map;
