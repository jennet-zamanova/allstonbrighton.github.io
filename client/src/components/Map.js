import React, { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from "react-leaflet";
import { map_1980 } from "./1980.js";
// Import required D3 modules
import { interpolateYlGnBu } from "d3";
import { scaleLinear } from "d3";
import Legend from "./modules/Legend.js";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = (props) => {
  const demographic = props.filter;

  const censusTracts = map_1980.features.map((feature) => {
    const tract = feature.properties.GISJOIN2;
    return tract.slice(-3) / 100;
  });

  const kids = map_1980.features.map((feature) => feature.properties[demographic]);
  // Define the color scale
  const colorScale = scaleLinear()
    .domain([Math.min(...kids), Math.max(...kids)])
    .range([0.3, 1]);

  // Create a function to get the color for a given data point
  const getColorForValue = (value) => interpolateYlGnBu(colorScale(value));
  const allColors = map_1980.features.map((feature) => [
    feature.properties.GISJOIN2,
    getColorForValue(feature.properties[demographic]),
  ]);

  const styleFunction = (feature) => {
    return {
      color: getColorForValue(feature.properties[demographic]) || "red", // Default color if not specified
      fillOpacity: 0.6, // You can set other style properties here, like weight, fill color, etc.
    };
  };

  // Function to handle click event on GeoJSON feature
  const handleFeatureClick = (feature, layer) => {
    // Bind popup to the clicked feature
    if (feature.properties) {
      layer.bindPopup("Number of Kids" + "<br>" + feature.properties[demographic]);
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
        <GeoJSON data={map_1980} style={styleFunction} onEachFeature={handleFeatureClick}></GeoJSON>
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
