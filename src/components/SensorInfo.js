import React from "react";
import { FaSoundcloud, FaGasPump, FaEye } from "react-icons/fa";

const SensorInfo = ({ soundValue, irValue, gasValue }) => {
  // Threshold values for visual feedback
  const soundThreshold = 600;
  const gasThreshold = 500;

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sound Sensor */}
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
          <FaSoundcloud size={40} className="text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold">Sound Sensor</h3>
          <p
            className={`text-2xl font-bold mt-2 ${
              soundValue > soundThreshold ? "text-red-500" : "text-green-500"
            }`}
          >
            {soundValue}
          </p>
          <p className="text-sm mt-1">
            {soundValue > soundThreshold ? "High Noise Detected!" : "Normal"}
          </p>
        </div>

        {/* IR Sensor */}
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
          <FaEye size={40} className="text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold">IR Sensor</h3>
          <p className="text-2xl font-bold mt-2">
            {irValue === 1 ? "Object Detected" : "No Object"}
          </p>
        </div>

        {/* Gas Sensor */}
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
          <FaGasPump size={40} className="text-red-500 mb-4" />
          <h3 className="text-lg font-semibold">Gas Sensor</h3>
          <p
            className={`text-2xl font-bold mt-2 ${
              gasValue > gasThreshold ? "text-red-500" : "text-green-500"
            }`}
          >
            {gasValue}
          </p>
          <p className="text-sm mt-1">
            {gasValue > gasThreshold ? "Gas Leak Alert!" : "Safe"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorInfo;
