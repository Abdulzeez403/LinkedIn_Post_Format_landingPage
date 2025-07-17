import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import Features from "./components/Features";
import Login from "./components/Login";
// import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Success from "./pages/Success";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/success" element={<Success />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Demo />
                <Features />
                <Login />
                {/* <Pricing /> */}
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
