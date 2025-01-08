import React, { useEffect, useState } from "react";
import { database, ref, onValue, off, set } from "../firebase";
import SensorInfo from "../components/SensorInfo";
import ApplianceControl from "../components/ApplianceControl";
import { FaLightbulb, FaFan, FaThermometer, FaGasPump, FaCamera } from "react-icons/fa"; // Icons for appliances

const Dashboard = () => {
  const [soundValue, setSoundValue] = useState(0);
  const [irValue, setIrValue] = useState(0);
  const [gasValue, setGasValue] = useState(0);
  const [ledState, setLedState] = useState(0);
  const [lightState, setLightState] = useState(0);
  const [fanState, setFanState] = useState(0);
  const [acState, setAcState] = useState(0);
  const [camFeedUrl, setCamFeedUrl] = useState(""); // ESP32 CAM Feed URL
  const [capturedImage, setCapturedImage] = useState(""); // Captured image URL

  useEffect(() => {
    const soundRef = ref(database, "/soundValue");
    const irRef = ref(database, "/objectDetected");
    const gasRef = ref(database, "/gasConcentration");
    const ledRef = ref(database, "/ledState");
    const lightRef = ref(database, "/lightState");
    const fanRef = ref(database, "/fanState");
    const acRef = ref(database, "/acState");
    const camFeedRef = ref(database, "/camFeedUrl"); // Reference for CAM Feed URL
    const capturedImageRef = ref(database, "/capturedImage"); // Reference for captured image URL

    // Real-time updates for sensor and appliance values
    onValue(soundRef, (snapshot) => setSoundValue(snapshot.val()));
    onValue(irRef, (snapshot) => setIrValue(snapshot.val()));
    onValue(gasRef, (snapshot) => setGasValue(snapshot.val()));
    onValue(ledRef, (snapshot) => setLedState(snapshot.val()));
    onValue(lightRef, (snapshot) => setLightState(snapshot.val()));
    onValue(fanRef, (snapshot) => setFanState(snapshot.val()));
    onValue(acRef, (snapshot) => setAcState(snapshot.val()));
    onValue(camFeedRef, (snapshot) => setCamFeedUrl(snapshot.val()));
    onValue(capturedImageRef, (snapshot) => setCapturedImage(snapshot.val()));

    return () => {
      // Clean up the listeners when the component is unmounted
      off(soundRef);
      off(irRef);
      off(gasRef);
      off(ledRef);
      off(lightRef);
      off(fanRef);
      off(acRef);
      off(camFeedRef);
      off(capturedImageRef);
    };
  }, []);

  const toggleAppliance = (appliance, currentState) => {
    const newState = currentState === 1 ? 0 : 1;
    const applianceRef = ref(database, `/${appliance}`);
    set(applianceRef, newState);
  };

  const captureImage = () => {
    // Simulate capturing an image; in practice, trigger ESP32 to capture and store the image.
    const timestamp = Date.now();
    const imageUrl = `${camFeedUrl}/capture?${timestamp}`; // Assuming capture endpoint
    setCapturedImage(imageUrl);
    set(ref(database, "/capturedImage"), imageUrl); // Update in Firebase
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-500 mb-10">
          Home Automation Dashboard
        </h1>

        {/* Sensor Information Section */}
        <div className="mb-12">
          <SensorInfo soundValue={soundValue} irValue={irValue} gasValue={gasValue} />
        </div>

        {/* Appliance Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Appliance Control Cards */}
          {/* Add existing appliance cards here */}
          {/* Camera Control Card */}
          <div className="w-full max-w-xs mx-auto bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex flex-col items-center">
              <FaCamera className="text-purple-500 text-6xl mb-4" />
              <h3 className="text-xl text-gray-200">Camera</h3>
              {camFeedUrl ? (
                <div className="mt-4">
                  <img
                    src={camFeedUrl}
                    alt="Live Feed"
                    className="w-full rounded-md mb-4"
                  />
                  <button
                    onClick={captureImage}
                    className="px-4 py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 transition duration-200"
                  >
                    Capture Image
                  </button>
                  {capturedImage && (
                    <div className="mt-4">
                      <h4 className="text-gray-400">Captured Image:</h4>
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full rounded-md"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">Camera feed not available</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Home Automation System | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
