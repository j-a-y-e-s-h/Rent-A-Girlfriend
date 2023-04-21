// // app.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// app.use(cors());
// app.use(express.json());

// const JWT_SECRET =
//   "JDBCHBDkjdsncsdbn()sbchdshcb[]sjdchbvgsdv54c56s45dc4s4?sdjukbcjhbd";

// const mongoUrl =
//   "mongodb+srv://jayesh:1234@userdata.lhzdiif.mongodb.net/?retryWrites=true&w=majority";

// mongoose
//   .connect(mongoUrl, { useNewUrlParser: true })
//   .then(() => {
//     console.log("Connected To Database....");
//   })
//   .catch((e) => console.log(e));

// require("./userDetails");
// const User = mongoose.model("UserInfo");

// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const encryptPassword = await bcrypt.hash(password, 10);
//   try {
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.send({ error: "User Exists" });
//     }
//     const newUser = await User.create({
//       name,
//       email,
//       password: encryptPassword,
//     });
//     console.log(newUser);
//     res.send({ status: "ok" });
//     console.log("Registered user successfully");
//   } catch (error) {
//     console.error(error);
//     res.send({ status: "error" });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.json({ error: "User Not Found" });
//   }
//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({email:user.email}, JWT_SECRET);
//     if (res.status(201)) {
//       return res.json({ status: "ok", data: token });
//     } else {
//       return res.json({ status: "error" });
//     }
//   }
//   res.json({ status: "error", error: "Invalid Password" });
// });

// // app.post("/NewNavbar", async (req, res) => {
// //   const { token } = req.body;
// //   try {
// //     const user = jwt.verify(token, JWT_SECRET);
// //     const useremail = user.email;
// //     User.findOne({ email: useremail })
//       // .then((data) => {
//       //   res.send({ status: "ok", data: data });
//       // })
// //       .catch((error) => {
// //         res.send({ status: "ok", data: data });
// //       });
// //   } catch (error) {}
// // });

// // app.post("/NewNavbar", async (req, res) => {
// //   const { token, image } = req.body;
// //   try {
// //     const user = jwt.verify(token, JWT_SECRET);
// //     const useremail = user.email;
// //    await User.findOneAndUpdate(
// //      { email: useremail },
// //      { $set: { images: image } },
// //      { new: true }
// //    )
// //    .then((data) => {
// //     res.send({ status: "ok", data: data });
// //   })
// //       .catch((error) => {
// //         console.log(error);
// //         res.sendStatus(500);
// //       });
// //   } catch (error) {
// //     console.log(error);
// //     res.sendStatus(500);
// //   }
// // });

// app.post("/NewNavbar", async (req, res) => {
//   const { token, image } = req.body;
//   try {
//     const user = jwt.verify(token, JWT_SECRET);
//     const useremail = user.email;
//     const imageBuffer = Buffer.from(image, "base64");
//     await User.findOneAndUpdate(
//       { email: useremail },
//       { $set: { images: imageBuffer } },
//       { new: true }
//     ).then((data) => {
//       res.send({ status: "ok", data: data });
//     }).catch((error) => {
//       console.log(error);
//       res.sendStatus(500);
//     });
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });


// app.listen(5000, () => {
//   console.log("server started....");
// });

// profile.jsx
import React, { useState } from "react";

const Profile = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // const handleImageChange = (event, setState) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       if (img.width / img.height === 9 / 16) {
  //         setState(e.target.result);
  //       } else {
  //         alert(
  //           "Invalid image aspect ratio. Please upload an image with a 9:16 aspect ratio."
  //         );
  //       }
  //     };
  //     img.src = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleImageChange = (event, setState) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width / img.height === 9 / 16) {
          const imageData = btoa(e.target.result);
          setState(imageData);
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
    const token = localStorage.getItem("token");
    const image = image1 || image2 || image3 || image4;
    if (image && token) {
      await fetch("http://localhost:5000/NewNavbar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, image }),
      }).then((res) => {
        if (res.status === 200) {
          console.log("Image Added Successfully");
        } else {
          console.log("Error Adding Image");
        }
      });
    }
  };

  return (
    <div className="flex flex-col  md:flex-row md:h-full gap-4 ">
      <div className="w-full h-[38rem] md:w-1/4 bg-gray-100 relative">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setImage1)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {image1 && (
          <img
            src={image1}
            alt="Box 1 Image"
            className="w-full h-full object-cover"
            style={{ height: "100%" }}
          />
        )}
        {!image1 && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">Upload Image 1</p>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/3 grid gap-4 md:h-full grid-cols-1 md:grid-rows-3">
        <div className="h-48 w-[28%] bg-gray-100 relative">
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
        className="bg-red-400 h-10 mt-96 w-24 rounded-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Profile;
