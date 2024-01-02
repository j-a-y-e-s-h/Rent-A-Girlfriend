const Guest = () => {
  return (
    <div className="">
      <img src="./Moto.png" alt="Moto" className="h-auto w-[60%] mt-36 ml-12" />
      <button
        type="button"
        className="absolute bg-[#f1356d] uppercase font-semibold text-white border-0 border-black rounded-full cursor-pointer 
                   tracking-wider ml-[24%] mt-[1.8%] h-16 w-48 text-2xl font-sans hover:bg-white hover:duration-300 
                   hover:text-[#f1356d] hover:border-8 hover:border-[#f1356d] shadow-md shadow-black"
      >
        Guest
      </button>
    </div>
  );
};

export default Guest;
