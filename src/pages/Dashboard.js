// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { database, ref, onValue, off, set } from "../firebase"; // Import the missing functions (off and set)
import SensorInfo from "../components/SensorInfo";
import LedControl from "../components/LedControl";

const Dashboard = () => {
  const [soundValue, setSoundValue] = useState(0);
  const [irValue, setIrValue] = useState(0);
  const [gasValue, setGasValue] = useState(0);
  const [ledState, setLedState] = useState(0);

  useEffect(() => {
    // Fetch data from Firebase in real-time
    const soundRef = ref(database, "/soundValue");
    const irRef = ref(database, "/objectDetected");
    const gasRef = ref(database, "/gasConcentration");
    const ledRef = ref(database, "/ledState");

    // Real-time listeners for data
    onValue(soundRef, (snapshot) => setSoundValue(snapshot.val()));
    onValue(irRef, (snapshot) => setIrValue(snapshot.val()));
    onValue(gasRef, (snapshot) => setGasValue(snapshot.val()));
    onValue(ledRef, (snapshot) => setLedState(snapshot.val()));

    return () => {
      // Cleanup listeners on component unmount
      off(soundRef);
      off(irRef);
      off(gasRef);
      off(ledRef);
    };
  }, []);

  const toggleLed = () => {
    const newLedState = ledState === 1 ? 0 : 1;
    const ledRef = ref(database, "/ledState");
    set(ledRef, newLedState);  // Update the LED state in the database
  };

  return (
    <div className="dashboard">
      <h1>Home Automation Dashboard</h1>
      <SensorInfo
        soundValue={soundValue}
        irValue={irValue}
        gasValue={gasValue}
      />
      <LedControl ledState={ledState} toggleLed={toggleLed} />
    </div>
  );
};

export default Dashboard;
