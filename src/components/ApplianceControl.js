import React from "react";

const ApplianceControl = ({ applianceName, state, toggle }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{applianceName}</h3>
      <p>State: <span className={state === 1 ? "text-green-500" : "text-red-500"}>{state === 1 ? "ON" : "OFF"}</span></p>
      <button
        onClick={toggle}
        className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 focus:ring focus:ring-indigo-500"
      >
        Toggle {applianceName}
      </button>
    </div>
  );
};

export default ApplianceControl;
