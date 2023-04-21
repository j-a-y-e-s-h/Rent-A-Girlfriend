import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/NewNavbar", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "applicatioan/json",
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
      fetch("http://localhost:5000/getImages", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          const { image1, image2, image3, image4 } = data;
          const promises = [image1, image2, image3, image4].map((image) =>
            fetch(image)
          );
          Promise.all(promises).then((responses) =>
            Promise.all(
              responses.map((response) =>
                response.blob().then((blob) => URL.createObjectURL(blob))
              )
            ).then((urls) =>
              setUserDetails((prevState) => ({
                ...prevState,
                image1: urls[0],
                image2: urls[1],
                image3: urls[2],
                image4: urls[3],
              }))
            )
          );
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap z-50 sticky bg-slate-800 px-6 py-3 top-0 mt-[0.4px]">
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
        <Link to="/profile">
          <p name="aa" className=" block text-md text-white mr-4 cursor-pointer">
            <img src={userDetails.image1} alt="Profile" className="mx-auto h-14 w-14 rounded-full sm:mx-0 sm:flex-shrink-0" />
          </p>
        </Link>
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
