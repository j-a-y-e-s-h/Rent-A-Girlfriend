import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/NewNavbar", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-800 px-6 py-3 top-0 mt-[0.4px]">
      <div className="flex items-center flex-shrink-0 mr-6">
        <a href="/">
          <img src="logo.png" alt="Logo" className="h-[73px]" />
        </a>
      </div>
      <div className="flex items-center space-x-3">
        <button className=" flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white ">
          <img
            src="notification.png"
            alt="Notification"
            className="cursor-pointer h-10"
          />
        </button>
        <p className="block text-md text-white mr-4 cursor-pointer">
          <img src="profile.png" alt="Profile" className="h-[50px]" />
        </p>
        {userData && (
          <p className="block text-base font-medium text-white mr-8 cursor-pointer">
            {userData.name}
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
