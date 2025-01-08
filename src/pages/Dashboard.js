import React, { useEffect, useState } from "react";
import { database, ref, onValue, off, set } from "../firebase";
import SensorInfo from "../components/SensorInfo";
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
  const [isRecording, setIsRecording] = useState(false); // To track recording state

  useEffect(() => {
    const soundRef = ref(database, "/soundValue");
    const irRef = ref(database, "/objectDetected");
    const gasRef = ref(database, "/gasConcentration");
    const ledRef = ref(database, "/ledState");
    const lightRef = ref(database, "/lightState");
    const fanRef = ref(database, "/fanState");
    const acRef = ref(database, "/acState");
    const camFeedRef = ref(database, "/camFeedUrl"); // Reference for CAM Feed URL
    const capturedImageRef = ref(database, "/capturedImage");

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
    const timestamp = Date.now();
    const imageUrl = `${camFeedUrl}/capture?${timestamp}`;
    setCapturedImage(imageUrl);
    set(ref(database, "/capturedImage"), imageUrl);
  };

  const startRecording = () => {
    // Placeholder logic for recording start
    setIsRecording(true);
    console.log("Recording started");
  };

  const stopRecording = () => {
    // Placeholder logic for recording stop
    setIsRecording(false);
    console.log("Recording stopped");
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
          {/* LED Control Card */}
          <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex flex-col items-center">
              <FaLightbulb className="text-yellow-500 text-6xl mb-4" />
              <h3 className="text-xl text-gray-200">LED</h3>
              <p className={`text-lg text-${ledState ? "green" : "red"}-400 mb-4`}>
                {ledState === 1 ? "On" : "Off"}
              </p>
              <button
                onClick={() => toggleAppliance("ledState", ledState)}
                className="px-4 py-2 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 transition duration-200"
              >
                {ledState === 1 ? "Turn Off" : "Turn On"}
              </button>
            </div>
          </div>

          {/* Light Control Card */}
          <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex flex-col items-center">
              <FaLightbulb className="text-green-500 text-6xl mb-4" />
              <h3 className="text-xl text-gray-200">Light</h3>
              <p className={`text-lg text-${lightState ? "green" : "red"}-400 mb-4`}>
                {lightState === 1 ? "On" : "Off"}
              </p>
              <button
                onClick={() => toggleAppliance("lightState", lightState)}
                className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition duration-200"
              >
                {lightState === 1 ? "Turn Off" : "Turn On"}
              </button>
            </div>
          </div>

          {/* Fan Control Card */}
          <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex flex-col items-center">
              <FaFan className="text-blue-500 text-6xl mb-4" />
              <h3 className="text-xl text-gray-200">Fan</h3>
              <p className={`text-lg text-${fanState ? "green" : "red"}-400 mb-4`}>
                {fanState === 1 ? "On" : "Off"}
              </p>
              <button
                onClick={() => toggleAppliance("fanState", fanState)}
                className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {fanState === 1 ? "Turn Off" : "Turn On"}
              </button>
            </div>
          </div>

          {/* AC Control Card */}
          <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex flex-col items-center">
              <FaThermometer className="text-red-500 text-6xl mb-4" />
              <h3 className="text-xl text-gray-200">AC</h3>
              <p className={`text-lg text-${acState ? "green" : "red"}-400 mb-4`}>
                {acState === 1 ? "On" : "Off"}
              </p>
              <button
                onClick={() => toggleAppliance("acState", acState)}
                className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition duration-200"
              >
                {acState === 1 ? "Turn Off" : "Turn On"}
              </button>
            </div>
          </div>
          {/* Camera Control Card */}
          <div className="w-full max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex flex-col items-center">
              <FaCamera className="text-purple-500 text-6xl mb-4" />
              <h3 className="text-xl text-gray-200 mb-4">Camera Control</h3>
              {camFeedUrl ? (
                <div className="w-full">
                  {/* Live Preview */}
                  <div className="relative rounded-md overflow-hidden border border-gray-600 mb-4">
                    <video
                      src={camFeedUrl}
                      autoPlay
                      muted
                      className="w-full h-60 object-cover"
                    ></video>
                  </div>
                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={captureImage}
                      className="px-4 py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 transition duration-200"
                    >
                      Capture Image
                    </button>
                    <button
                      onClick={startRecording}
                      className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition duration-200"
                    >
                      Start Recording
                    </button>
                    <button
                      onClick={stopRecording}
                      className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition duration-200"
                    >
                      Stop Recording
                    </button>
                  </div>
                  {/* Captured Image */}
                  {capturedImage && (
                    <div className="mt-6">
                      <h4 className="text-gray-400 mb-2">Captured Image:</h4>
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full rounded-md border border-gray-600"
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
