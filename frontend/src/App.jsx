import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./pages/Chatbot";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import MultiShot from "./pages/Multishot";

function App() {
  return (
    <Router>
      <div className="dark bg-black text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/multishot" element={<MultiShot />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
