import React, { useState, useEffect } from "react";
import { get, post } from "../utilities.js";
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from "react-leaflet";
import { map_1980 } from "./1980.js";
import { map_ver_2 } from "./1980_ver2.js";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = () => {
  const [map, setMap] = useState(null);
  const [geojson, setGeojson] = useState(null);
  // get("/api/allGeoJSON", { name: "neighborhood_tract_1980" }).then((output) => {
  //   setMap(output);
  // });

  useEffect(() => {
    const body = { name: "neighborhood_tract_1980" };
    // post("/api/tract", map_1980);

    get("/api/allGeoJSON", body)
      .then((output) => {
        // setMap(output);
        setMap(output);
        setGeojson(<GeoJSON data={output} style={{ fillColor: "red" }} />);
        console.log(output);
      })
      .catch((error) => {
        console.error("Error while parsing GeoJSON data", error);
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

        {/* {map &&
          map.features &&
          map.features.map((feature, index) => {
            console.log("rendering stuff - printing feature");
            console.log(feature);
            return <GeoJSON key={index} data={feature} style={{ fillColor: "red" }} />;
          })} */}

        {/* <GeoJSON data={map_ver_2} style={{ fillColor: "red" }}>
          {console.log("printing from actual data")}
          {console.log(map_ver_2)}
        </GeoJSON> */}

        {/* <GeoJSON data={map ? map.features[0] : null} style={{ fillColor: "red" }}>
          {console.log("hi - from api call")}
          {map ? console.log(JSON.stringify(map.features[0])) : console.log("map null rn")}
        </GeoJSON> */}
        {geojson}
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
