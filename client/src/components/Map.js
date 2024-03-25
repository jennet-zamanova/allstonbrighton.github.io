import React, { useState, useEffect } from "react";
import { get, post } from "../utilities.js";
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from "react-leaflet";
import { map_1980 } from "./1980.js";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = () => {
  const [map, setMap] = useState(null);
  let map_test;
  // post("/api/tract", map_1980);
  // get("/api/allGeoJSON", { name: "neighborhood_tract_1980" }).then((output) => {
  //   setMap(output);
  // });

  useEffect(() => {
    const body = { name: "neighborhood_tract_1980" };
    get("/api/allGeoJSON", body).then((output) => {
      setMap(output);
      console.log("printing output rn");
      console.log(output);
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
        <GeoJSON data={map} style={{ fillColor: "red" }}>
          {console.log("hi")}
          {console.log(map)}
        </GeoJSON>
        {/* <Marker position={[42.35346337378607, -71.14454379278231]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

export default Map;
