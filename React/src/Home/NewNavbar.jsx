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
    <nav className="flex justify-between items-center h-24 bg-slate-800 px-5 sticky z-2 top-0 mt-0.5">
      <div className="flex items-center">
        <a href="/">
          <img src="logo.png" alt="Logo" className="h-[90px]" />
        </a>
      </div>
      <div className="flex items-center space-x-3">
        <a href="/">
          <img src="notification.png" alt="Notification" className="h-16" />
        </a>
        <p className="cursor-pointer">
          <img src="profile.png" alt="Profile" className="h-[60px]" />
        </p>
        {userData && (
          <p className="cursor-pointer text-sm text-white ">{userData.name}</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
