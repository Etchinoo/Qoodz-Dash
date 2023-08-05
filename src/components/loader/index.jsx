import React, { memo } from "react";
import "./index.css";
const Loader = () => (
  <div className="loader-container">
    <div className="lds-css">
      <div style={{ width: "100%", height: "100%" }} className="lds-eclipse">
      </div>
    </div>
  </div>
);

export default memo(Loader);
