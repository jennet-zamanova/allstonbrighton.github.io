import React, { useState, useEffect } from "react";
import { get, post } from "../utilities.js";
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from "react-leaflet";
// Import required D3 modules
import { interpolateYlGnBu } from "d3";
import { scaleLinear } from "d3";
import Legend from "./modules/Legend.js";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = (props) => {
  const [mapAB, setMap] = useState(null);
  const [geojson, setGeojson] = useState(null);
  const [legend, setLegend] = useState(null);
  const demographic = props.filter;

  useEffect(() => {
    const body = { name: "1980" };
    // post("/api/tract", map_1980); // use this code to post new data to mongoDB

    get("/api/allGeoJSON", body)
      .then((output) => {
        console.log(output);
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

  let styleFunction = (feature) => {
    return {
      color: "red", // Default color if not specified
      fillOpacity: 0.6, // You can set other style properties here, like weight, fill color, etc.
    };
  };
  useEffect(() => {
    if (mapAB !== null) {
      console.log(mapAB);
      // select colorscale based on data
      const demographicCategory = mapAB.features.map((feature) => feature.properties[demographic]);
      // Define the color scale
      const colorScale = scaleLinear()
        .domain([Math.min(...demographicCategory), Math.max(...demographicCategory)])
        .range([0.3, 1]);

      // Create a function to get the color for a given data point
      const getColorForValue = (value) => interpolateYlGnBu(colorScale(value));

      // color the map
      styleFunction = (feature) => {
        return {
          color: getColorForValue(feature.properties[demographic]) || "red", // Default color if not specified -> smth went wrong
          fillOpacity: 0.6,
        };
      };

      // setup the legend
      const censusTracts = mapAB.features.map((feature) => {
        const tract = feature.properties.GISJOIN2;
        return tract.slice(-3) / 100;
      });

      const allColors = mapAB.features.map((feature) => [
        feature.properties.GISJOIN2,
        getColorForValue(feature.properties[demographic]),
      ]);

      setGeojson(<GeoJSON data={mapAB} style={styleFunction} onEachFeature={handleFeatureClick} />);
      setLegend(<Legend legendItems={mapAB.features} allColors={allColors} />);
    }
  }, [mapAB]);

  // Function to handle click event on GeoJSON feature
  const handleFeatureClick = (feature, layer) => {
    // Bind popup to the clicked feature
    if (feature.properties) {
      // modify once the category name is known
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
        {legend}
      </MapContainer>
    </div>
  );
};

export default Map;
