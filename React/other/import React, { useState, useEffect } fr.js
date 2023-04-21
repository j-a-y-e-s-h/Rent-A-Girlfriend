import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/userDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      setUserDetails(data);
    };

    fetchUserDetails();
  }, []);

  // Render a loading spinner if userDetails is not yet set.
  if (!userDetails) {
    return (
      <div>Loading user details...</div>
    );
  }

  // Get an array of all the image URLs from the userDetails.
  const imageUrls = userDetails.getImageUrls();

  return (
    <>
      <div className="flex flex-col overflow-auto md:flex-row md:h-full gap-4">
        {/* ... */}
      </div>
      <div name="a" className="grid grid-cols-2 gap-4 mt-8">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${imageUrl}`}
            alt={`Image ${index + 1}`}
            className="object-cover h-96"
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
