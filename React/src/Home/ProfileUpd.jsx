import { useState } from "react";

function ProfileUpd() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [pickupLine, setPickupLine] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert blob to base64
    const convertBlobToBase64 = async (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    };

    const data = {
      name,
      age,
      gender,
      aboutMe,
      pickupLine,
      image1: await convertBlobToBase64(image1),
      image2: await convertBlobToBase64(image2),
      image3: await convertBlobToBase64(image3),
      image4: await convertBlobToBase64(image4),
    };

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileSize = (e) => {
    if (e.target.files[0].size > 1000000) {
      alert(
        "File size exceeds 1 MB. Please upload an image of size less than 1 MB."
      );
      e.target.value = null;
    }
  };

  const handleImageRatio = (e) => {
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      if (img.width / img.height !== 9 / 16) {
        alert(
          "Image ratio should be 9:16. Please upload an image with that ratio."
        );
        e.target.value = null;
      }
    };
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 font-bold mb-2"
          >
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 font-bold mb-2"
          >
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an option</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="NB">Non-binary</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="aboutMe"
            className="block text-gray-700 font-bold mb-2"
          >
            About Me:
          </label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pickupLine"
            className="block text-gray-700 font-bold mb-2"
          >
            Pickup Line:
          </label>
          <input
            type="text"
            id="pickupLine"
            value={pickupLine}
            onChange={(e) => setPickupLine(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image1"
            className="block text-gray-700 font-bold mb-2"
          >
            Image 1:
          </label>
          <input
            type="file"
            id="image1"
            onChange={(e) => {
              setImage1(e.target.files[0]);
              handleFileSize(e);
              handleImageRatio(e);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image2"
            className="block text-gray-700 font-bold mb-2"
          >
            Image 2:
          </label>
          <input
            type="file"
            id="image2"
            onChange={(e) => {
              setImage2(e.target.files[0]);
              handleFileSize(e);
              handleImageRatio(e);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image3"
            className="block text-gray-700 font-bold mb-2"
          >
            Image 3:
          </label>
          <input
            type="file"
            id="image3"
            onChange={(e) => {
              setImage3(e.target.files[0]);
              handleFileSize(e);
              handleImageRatio(e);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image4"
            className="block text-gray-700 font-bold mb-2"
          >
            Image 4:
          </label>
          <input
            type="file"
            id="image4"
            onChange={(e) => {
              setImage4(e.target.files[0]);
              handleFileSize(e);
              handleImageRatio(e);
            }}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileUpd;
