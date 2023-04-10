import React from "react";
import Home from "./Guest/Home";
import NewHome from "./Home/NewHome";

const App = () => {
  const token = window.localStorage.getItem("token");

  return (
    <div className="body-font font-poppins">
      {token ? <NewHome /> : <Home />}
    </div>
  );
};

export default App;