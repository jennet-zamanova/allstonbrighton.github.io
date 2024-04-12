import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from "react-leaflet";
// Import required D3 modules
import { interpolateYlGnBu } from "d3";
import { scaleLinear } from "d3";
import Legend from "./Legend.js";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = (props) => {
  const [mapAB, setMap] = useState(null);
  const [geojson, setGeojson] = useState(null);
  const [legend, setLegend] = useState(null);
  let demographic = props.filter;
  let styleFunction = (feature) => {
    return {
      color: "red", // Default color if not specified
      fillOpacity: 0.6, // You can set other style properties here, like weight, fill color, etc.
    };
  };

  // Function to handle click event on GeoJSON feature
  const handleFeatureClick = (feature, layer) => {
    // Bind popup to the clicked feature
    console.log("current name", props.filterName);
    if (feature.properties) {
      // modify once the category name is known
      layer.unbindPopup();
      layer.bindPopup("Number of " + props.filterName + "<br>" + feature.properties[demographic]);
    }
  };

  useEffect(() => {
    demographic = props.filter;
    const body = { name: "1980" };
    console.log("opdated name", props.filterName);
    get("/api/allGeoJSON", body)
      .then((output) => {
        setMap(output);
      })
      .catch((error) => {
        console.error("Error while getting GeoJSON data from MongoDB", error);
      });
  }, [props]);

  useEffect(() => {
    if (mapAB !== null) {
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

      // console.log("categroy", props.filterName);
      setGeojson(<GeoJSON data={mapAB} style={styleFunction} onEachFeature={handleFeatureClick} />);
      setLegend(<Legend legendItems={mapAB.features} allColors={allColors} />);
    }
  }, [mapAB, props.filterName]);

  useEffect(() => {
    console.log("geojson is now", geojson);
  }, [geojson]);

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
