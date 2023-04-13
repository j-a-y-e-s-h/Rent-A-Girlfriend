import React, { useState, useEffect } from "react";
import NewNavbar from "./NewNavbar";

const Profile = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/getImages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const { image1, image2, image3, image4 } = data;
      setImage1(image1);
      setImage2(image2);
      setImage3(image3);
      setImage4(image4);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (event, setState) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const maxSize = 1024 * 1024; // 1 MB
    if (file.size > maxSize) {
      alert("File size is too large. Please select an image less than 1 MB.");
      return;
    }
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width / img.height === 9 / 16) {
          setState(e.target.result);
        } else {
          alert(
            "Invalid image aspect ratio. Please upload an image with a 9:16 aspect ratio."
          );
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    let base64Image1 = null;
    let base64Image2 = null;
    let base64Image3 = null;
    let base64Image4 = null;

    if (image1) {
      const response1 = await fetch(image1);
      const blob1 = await response1.blob();
      base64Image1 = await convertBlobToBase64(blob1);
    }

    if (image2) {
      const response2 = await fetch(image2);
      const blob2 = await response2.blob();
      base64Image2 = await convertBlobToBase64(blob2);
    }

    if (image3) {
      const response3 = await fetch(image3);
      const blob3 = await response3.blob();
      base64Image3 = await convertBlobToBase64(blob3);
    }

    if (image4) {
      const response4 = await fetch(image4);
      const blob4 = await response4.blob();
      base64Image4 = await convertBlobToBase64(blob4);
    }

    const token = localStorage.getItem("token");

    const data = {
      image1: base64Image1,
      image2: base64Image2,
      image3: base64Image3,
      image4: base64Image4,
    };

    await fetch("http://localhost:5000/addImages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    alert("Images added successfully");
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      <NewNavbar />
      <div className="flex ">
        <div className="w-1/5 h-[150vh] bg-gray-900">
          {/* First column on the right */}
        </div>
        <div className="w-4/5 flex h-[150vh] bg-gray-200">
          {/* Second column on the left */}
          <div className=" flex gap-4  mt-6">
            <div className=" ml-72 h-[512px] bg-gray-100 w-[290px] relative flex ">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImage1)}
                className="fixed h-[512px] w-[290px] opacity-0 cursor-pointer z-10"
              />
              {image1 && (
                <img
                  src={image1}
                  alt="Box 1 Image"
                  className="h-[512px]  w-[290px] object-cover"
                  style={{ height: "100%" }}
                />
              )}
              {!image1 && (
                <div className="h-[512px]  w-[290px] flex items-center justify-center">
                  <p className="text-gray-400">Upload Image 1</p>
                </div>
              )}
          </div>
            </div>
            <div className="w-1/3 grid gap-4 grid-cols-1 grid-rows-3">
              <div className="w-32 h-[200px] mt-6 bg-gray-100 ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setImage2)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {image2 && (
                  <img
                    src={image2}
                    alt="Box 2 Image"
                    className="w-full h-full object-cover"
                    style={{ height: "calc(100% - 20px)" }}
                  />
                )}
                {!image2 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Upload Image 2</p>
                  </div>
                )}
              </div>
              <div className="h-48 w-[28%] bg-gray-100 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setImage3)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {image3 && (
                  <img
                    src={image3}
                    alt="Box 3 Image"
                    className="w-full h-full object-cover"
                    style={{ height: "calc(100% - 20px)" }}
                  />
                )}
                {!image3 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Upload Image 3</p>
                  </div>
                )}
              </div>
              <div className="h-48 w-[28%] bg-gray-100 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setImage4)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {image4 && (
                  <img
                    src={image4}
                    alt="Box 4 Image"
                    className="w-full h-full object-cover"
                    style={{ height: "calc(100% - 20px)" }}
                  />
                )}
                {!image4 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Upload Image 4</p>
                  </div>
                )}
              </div>
            </div>
          <button
            className="bg-red-400 h-10 mt-4 w-24 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
