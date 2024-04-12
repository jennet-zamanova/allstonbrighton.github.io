import React from "react";

// Define your Legend component
const Legend = (props) => {
  // Style the legend as per your requirement
  const legendStyle = {
    backgroundColor: "white",
    padding: "2px",
    border: "1px solid #ccc",
    position: "absolute",
    zIndex: 1000,
    bottom: "10px", // Adjust bottom position as needed
    left: "10px", // Adjust left position as needed
  };

  // Render the legend items
  const renderLegendItems = () => {
    return props.legendItems.map((item) => (
      <div key={item.color}>
        <span
          style={{
            backgroundColor: props.allColors.filter(
              ([feature, color]) => feature === item.properties.GISJOIN2
            )[0][1],
            width: "20px",
            height: "20px",
            display: "inline-block",
          }}
        ></span>
        <span style={{ marginLeft: "5px" }}>
          {(item.properties.GISJOIN2 - 2500250000000) / 100}
        </span>
      </div>
    ));
  };

  return (
    <div style={legendStyle}>
      <p style={{ fontWeight: "bold", margin: "4px" }}>Legend</p>
      {renderLegendItems()}
    </div>
  );
};

export default Legend;
