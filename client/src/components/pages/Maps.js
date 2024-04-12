import React, { useState } from "react";
import SingleMap from "../modules/SingleMap.js";
// import SideMenu from "../modules/Menu.js";
import "./Maps.css";
const Maps = (props) => {
  return (
    <div className="Maps-page">
      <div className="Maps">
        {/* <div className="SideMenu">
          <SideMenu onPropChange={handlePropChange} />
        </div>
        <div className="SingleMap">
          {" "}
          <Map filter={category} filterName={categoryName} />
        </div> */}
        {/* <div className="SingleMap">
          <Map filter="JSE_T006_1" sharedProp={categoryName} />
        </div> */}
        <SingleMap />
        <SingleMap />
      </div>
    </div>
  );
};
export default Maps;
