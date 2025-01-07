import React, { useEffect, useState } from "react";
import { database, ref, onValue, off, set } from "../firebase";
import SensorInfo from "../components/SensorInfo";
import ApplianceControl from "../components/ApplianceControl";

const Dashboard = () => {
  const [soundValue, setSoundValue] = useState(0);
  const [irValue, setIrValue] = useState(0);
  const [gasValue, setGasValue] = useState(0);
  const [ledState, setLedState] = useState(0);
  const [lightState, setLightState] = useState(0);
  const [fanState, setFanState] = useState(0);
  const [acState, setAcState] = useState(0);

  useEffect(() => {
    const soundRef = ref(database, "/soundValue");
    const irRef = ref(database, "/objectDetected");
    const gasRef = ref(database, "/gasConcentration");
    const ledRef = ref(database, "/ledState");
    const lightRef = ref(database, "/lightState");
    const fanRef = ref(database, "/fanState");
    const acRef = ref(database, "/acState");

    onValue(soundRef, (snapshot) => setSoundValue(snapshot.val()));
    onValue(irRef, (snapshot) => setIrValue(snapshot.val()));
    onValue(gasRef, (snapshot) => setGasValue(snapshot.val()));
    onValue(ledRef, (snapshot) => setLedState(snapshot.val()));
    onValue(lightRef, (snapshot) => setLightState(snapshot.val()));
    onValue(fanRef, (snapshot) => setFanState(snapshot.val()));
    onValue(acRef, (snapshot) => setAcState(snapshot.val()));

    return () => {
      off(soundRef);
      off(irRef);
      off(gasRef);
      off(ledRef);
      off(lightRef);
      off(fanRef);
      off(acRef);
    };
  }, []);

  const toggleAppliance = (appliance, currentState) => {
    const newState = currentState === 1 ? 0 : 1;
    const applianceRef = ref(database, `/${appliance}`);
    set(applianceRef, newState);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-500 mb-10">Home Automation Dashboard</h1>
        
        {/* Sensor Information */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl text-center font-semibold text-gray-200 mb-4">Sensor Readings</h2>
          <SensorInfo 
            soundValue={soundValue} 
            irValue={irValue} 
            gasValue={gasValue} 
          />
        </div>

        {/* Appliance Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ApplianceControl
            applianceName="LED"
            state={ledState}
            toggle={() => toggleAppliance("ledState", ledState)}
          />
          <ApplianceControl
            applianceName="Light"
            state={lightState}
            toggle={() => toggleAppliance("lightState", lightState)}
          />
          <ApplianceControl
            applianceName="Fan"
            state={fanState}
            toggle={() => toggleAppliance("fanState", fanState)}
          />
          <ApplianceControl
            applianceName="AC"
            state={acState}
            toggle={() => toggleAppliance("acState", acState)}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Home Automation System | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
