const Navbar = () => {
  return (
    <div className="flex">
      <img
        src="./Logo2.png"
        alt="logo"
        className="h-24 w-[35%]  md:w-[27%] md:h-28 mx-8 my-3"
      />
      <button
        type="button"
        className="absolute bg-[#f1356d] uppercase font-semibold text-white border-0 border-black rounded-full cursor-pointer tracking-wider
                   ml-[107%] mt-8 h-14 w-36 text-xl font-sans hover:bg-white hover:duration-300 hover:text-[#f1356d] hover:border-[8px]
                   hover:border-[#f1356d] shadow-md shadow-black"
      >
        Log In
      </button>
    </div>
  );
};

export default Navbar;
