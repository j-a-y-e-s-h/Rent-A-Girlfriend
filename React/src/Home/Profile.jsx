import React, { useState, useEffect } from "react";
import NewNavbar from "./NewNavbar";
import ProfileUpd from "./ProfileUpd";

const Profile = () => {
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
  const [activeTab, setActiveTab] = useState("profile");

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

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <NewNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <div className="py-8 w-full md:w-1/4">
          <ul className="flex flex-col space-y-4">
            <li
              className={`${
                activeTab === "profile" ? "bg-gray-100" : ""
              } rounded-lg`}
            >
              <button onClick={() => handleTabChange("profile")}>
                Your Profile
              </button>
            </li>
            <li
              className={`${
                activeTab === "updateProfile" ? "bg-gray-100" : ""
              } rounded-lg`}
            >
              <button onClick={() => handleTabChange("updateProfile")}>
                Update Profile
              </button>
            </li>
            <li
              className={`${
                activeTab === "contactUs" ? "bg-gray-100" : ""
              } rounded-lg`}
            >
              <button onClick={() => handleTabChange("contactUs")}>
                Contact Us
              </button>
            </li>
           <li>
             <button onClick={() => {
               localStorage.clear();
               window.location.href = "/";
             }}>Log Out</button>
           </li>
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          {activeTab === "profile" ? (
            <div className="py-8">
              <div className="rounded-lg bg-white shadow-lg px-5 py-6 sm:px-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex sm:space-x-5">
                    <img
                      className="mx-auto h-20 w-20 rounded-full sm:mx-0 sm:flex-shrink-0"
                      src={userDetails.image1}
                      alt=""
                    />
                    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <p className="text-xl font-bold text-gray-900 uppercase">
                        {userData ? userData.name : ""}
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                      {userData ? userData.age : ""}-
                      {userData ? userData.gender : ""}
 
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center sm:mt-0 sm:ml-4">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Like
                    </a>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-center mt-8">
                  <div className="w-full md:w-1/4 px-4 mb-4">
                    <img
                      src={userDetails.image1}
                      alt=""
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full md:w-1/4 px-4 mb-4">
                    <img
                      src={userDetails.image2}
                      alt=""
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full md:w-1/4 px-4 mb-4">
                    <img
                      src={userDetails.image3}
                      alt=""
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full md:w-1/4 px-4 mb-4">
                    <img
                      src={userDetails.image4}
                      alt=""
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg px-4 py-5 sm:p-6">
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                  About Me
                </h2>
                <p className="text-gray-700 leading-normal">
                {userData ? userData.aboutMe : ""}
                </p>
              </div>

              <div className="bg-white shadow-md rounded-lg mt-8 px-4 py-5 sm:p-6">
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                 Pickup Line
                </h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-4 flex">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                      {userData ? userData.pickupLine : ""}

                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg mt-8 px-4 py-5 sm:p-6">
              {activeTab === "updateProfile" ? (
                <ProfileUpd/>
              ) : (
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                  Contact Us
                </h2>
              )}
              {activeTab === "updateProfile" ? (
                <form onSubmit={() => console.log("submit handler function")}>
                  {/* form fields go here */}
                </form>
              ) : (
                <form onSubmit={() => console.log("submit handler function")}>
                  {/* form fields go here */}
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
