import React from "react";

const SensorInfo = ({ soundValue, irValue, gasValue }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Sensor Information</h2>
      <p>Sound Sensor Value: {soundValue}</p>
      <p>IR Sensor: {irValue === 1 ? "Object Detected" : "No Object"}</p>
      <p>Gas Concentration: {gasValue}</p>
    </div>
  );
};

export default SensorInfo;
