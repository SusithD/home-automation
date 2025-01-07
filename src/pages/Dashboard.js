import React, { useEffect, useState } from "react";
import { database, ref, onValue, off, set } from "../firebase";
import SensorInfo from "../components/SensorInfo";
import ApplianceControl from "../components/ApplianceControl";
import Navbar from "../components/Navbar";

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
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Home Automation Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SensorInfo soundValue={soundValue} irValue={irValue} gasValue={gasValue} />
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
      </div>
    </div>
  );
};

export default Dashboard;
