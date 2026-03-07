import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hemocentros from "./pages/Hemocentros";
import SobreNos from "./pages/SobreNos";


function App() {
  return (
    <Router>

      <Navbar />

      <div style={{ padding: "20px" }}>

        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/hemocentros" element={<Hemocentros />} />

          <Route path="/sobre" element={<SobreNos/>}/>

        </Routes>

      </div>

    </Router>
  );
}

export default App;