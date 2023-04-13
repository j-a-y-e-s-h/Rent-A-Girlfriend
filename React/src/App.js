import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Guest/Home";
import NewHome from "./Home/NewHome";
import Profile from "./Home/Profile";

const App = () => {
  const token = window.localStorage.getItem("token");

  return (
    <Router>
      <div className="body-font font-poppins">
        <Routes>
          <Route path="/" element={token ? <NewHome /> : <Home />} />
          <Route path="/NewHome" element={token ? <NewHome /> : <Home />} />
          <Route path="/profile" element={token ? <Profile /> : <Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
