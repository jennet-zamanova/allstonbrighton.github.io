import React, { useState } from "react";
import Map from "./Map.js";
const Maps = (props) => {
  return (
    <div className="Maps">
      <div style={{ display: "inline-block", width: "45%", height: "90vh", padding: "2.5%" }}>
        {" "}
        <Map filter="JSE_T006_0" />
      </div>
      <div style={{ display: "inline-block", width: "45%", height: "90vh", padding: "2.5%" }}>
        <Map filter="JSE_T006_1" />
      </div>
    </div>
  );
};
export default Maps;
