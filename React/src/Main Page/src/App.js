import "./App.css";
import Navbar from "./Navbar";
import Guest from "./Guest";
import Slider from "./Slider";

function App() {
  return (
    <div className="">
      <div className="">
        <Slider />
      </div>
      <div className="absolute">
        <Navbar />
        <Guest />
      </div>
    </div>
  );
}

export default App;
