// src/components/LedControl.js
import React from "react";

const LedControl = ({ ledState, toggleLed }) => {
  return (
    <div className="led-control">
      <p>LED State: {ledState === 1 ? "ON" : "OFF"}</p>
      <button onClick={toggleLed}>Toggle LED</button>
    </div>
  );
};

export default LedControl;
