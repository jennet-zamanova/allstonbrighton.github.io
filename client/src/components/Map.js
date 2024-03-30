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

const Map = (props) => {
  const [map, setMap] = useState(null);
  const [geojson, setGeojson] = useState(null);
  const demographic = props.filter;

  useEffect((props) => {
    const body = { name: "1980" };
    // post("/api/tract", map_1980); // use this code to post new data to mongoDB

    get("/api/allGeoJSON", body)
      .then((output) => {
        setMap(output);
        // creating geoJSON object to visualize map data once we have it from api call
        setGeojson(
          <GeoJSON data={output} style={styleFunction} onEachFeature={handleFeatureClick} />
        );
      })
      .catch((error) => {
        console.error("Error while getting GeoJSON data from MongoDB", error);
      });
  }, []);

  const styleFunction = (feature) => {
    console.log(map);
    if (map !== null) {
      const demographicCategory = map.features.map((feature) => feature.properties[demographic]);
      // Define the color scale
      const colorScale = scaleLinear()
        .domain([Math.min(...demographicCategory), Math.max(...demographicCategory)])
        .range([0.3, 1]);

      // Create a function to get the color for a given data point
      const getColorForValue = (value) => interpolateYlGnBu(colorScale(value));
      return {
        color: getColorForValue(feature.properties[demographic]) || "red", // Default color if not specified
        fillOpacity: 0.6, // You can set other style properties here, like weight, fill color, etc.
      };
    }
  };

  // Function to handle click event on GeoJSON feature
  const handleFeatureClick = (feature, layer) => {
    // Bind popup to the clicked feature
    if (feature.properties) {
      layer.bindPopup("Number of some category" + "<br>" + feature.properties[demographic]);
    }
  };

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

// need for the legend
// const censusTracts = map_1980.features.map((feature) => {
//   const tract = feature.properties.GISJOIN2;
//   return tract.slice(-3) / 100;
// });

// const allColors = map_1980.features.map((feature) => [
//   feature.properties.GISJOIN2,
//   getColorForValue(feature.properties[demographic]),
// ]);
