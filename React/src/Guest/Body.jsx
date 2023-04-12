import React, { useState } from "react";
import Top from "./Top";

const Body = () => {
  const [sliderOpen, setSliderOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden" >
      <div
        name="a"
        className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-100 z-10 rounded-t-xl overflow-hidden transform transition-all duration-500 ease-out border-t-4 border-gray-500"
        style={{ height: sliderOpen ? "80vh" : 0 }}
      >
        <button
          onClick={() => setSliderOpen(false)}
          className="absolute top-0 right-0 p-2"
        >
          X
        </button>
        {/* Updated code block */}
        <div className={`bg-gray-100 ${sliderOpen ? "py-4" : "h-0"}`}>
          <div className="w-1/2 mx-auto">
            <Top />
          </div>
        </div>
        {/* End of updated code block */}
      </div>
    
      <div className="h-full flex overflow-y-hidden">
        <div
          name="a"
          className="hidden md:block w-1/4 bg-gray-100"
        >
          <Top />
        </div>
        <div name="b" className="w-full md:w-3/4 bg-gray-200"></div>
      </div>
    
      <button
        onClick={() => setSliderOpen(!sliderOpen)}
        className="md:hidden fixed bottom-0 left-0 right-0 w-full py-2 text-black font-bold bg-gradient-to-t from-stone-600 via-transparent to-transparent hover:from-stone-600 "
        style={{ zIndex: 20, transition: "background-color 0.5s ease-out" }}
      >
        Trending
      </button>
    </div>
    
  );
};

export default Body;
