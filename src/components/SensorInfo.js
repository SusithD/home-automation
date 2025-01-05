// src/components/SensorInfo.js
import React from "react";

const SensorInfo = ({ soundValue, irValue, gasValue }) => {
  return (
    <div className="sensor-info">
      <p>Sound Sensor Value: {soundValue}</p>
      <p>IR Sensor (Object Detected): {irValue === 1 ? "Yes" : "No"}</p>
      <p>Gas Sensor Concentration: {gasValue}</p>
    </div>
  );
};

export default SensorInfo;
