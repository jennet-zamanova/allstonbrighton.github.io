import React, { useState } from "react";
import Map from "../modules/Map.js";
import SideMenu from "../modules/Menu.js";
import "./Maps.css";
const Maps = (props) => {
  const [sharedProp, setSharedProp] = useState("initialValue");
  const handlePropChange = (newValue) => {
    setSharedProp(newValue);
  };
  return (
    <div className="Maps-page">
      <div className="SideMenu">
        <SideMenu sharedProp={sharedProp} onPropChange={handlePropChange} />
      </div>
      <div className="Maps">
        <div className="SingleMap">
          {" "}
          <Map filter="JSE_T006_0" sharedProp={sharedProp} />
        </div>
        <div className="SingleMap">
          <Map filter="JSE_T006_1" sharedProp={sharedProp} />
        </div>
      </div>
    </div>
  );
};
export default Maps;
