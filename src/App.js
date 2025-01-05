// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" element={<Dashboard />} />  {/* Update Route syntax */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
