// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("users");
//   const filter = { _id: ObjectId("<existing_document_id>")   };
//   const updateOperations = { $set: { 
//       new_column_1: "<value_1>", 
//       new_column_2: "<value_2>",
//     } 
//   };
//   collection.updateOne(filter, updateOperations, function(err, res) {
//     console.log("Document updated");
//     client.close();
//   });
// });


// Profile.jsx

// import React from "react";
// import { useState } from "react";

// const Profile = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const onFileChange = (event) => {
//     // Check if uploaded file is an image
//     if (
//       event.target.files[0].type === "image/jpeg" ||
//       event.target.files[0].type === "image/png"
//     ) {
//       setSelectedFile(event.target.files[0]);
//     } else {
//       alert("Please upload a valid JPG or PNG image");
//     }
//   };

//   const onFileUpload = () => {
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     console.log(selectedFile);
//     // Add your HTTP request to upload the file here
//     // using fetch or any other library
//   };

//   return (
//     <div className="flex flex-row">
//       <div className="w-4/5 p-5">
//         {/* Code for your main profile section goes here */}
//         <p>Main Profile Section</p>
//       </div>
//       <div className="w-1/5 p-5 flex flex-col justify-end">
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Option 1</label>
//           <input type="file" onChange={onFileChange} />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Option 2</label>
//           <input type="file" onChange={onFileChange} />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Option 3</label>
//           <input type="file" onChange={onFileChange} />
//         </div>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onFileUpload}
//           disabled={!selectedFile}
//         >
//           Upload File
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// NewNavbar.jsx

// import React from "react";
// import { useState } from "react";

// const Profile = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const onFileChange = (event) => {
//     // Check if uploaded file is an image
//     if (
//       event.target.files[0].type === "image/jpeg" ||
//       event.target.files[0].type === "image/png"
//     ) {
//       setSelectedFile(event.target.files[0]);
//     } else {
//       alert("Please upload a valid JPG or PNG image");
//     }
//   };

//   const onFileUpload = () => {
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     console.log(selectedFile);
//     // Add your HTTP request to upload the file here
//     // using fetch or any other library
//   };

//   return (
//     <div className="flex flex-row">
//       <div className="w-4/5 p-5">
//         {/* Code for your main profile section goes here */}
//         <p>Main Profile Section</p>
//       </div>
//       <div className="w-1/5 p-5 flex flex-col justify-end">
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Option 1</label>
//           <input type="file" onChange={onFileChange} />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Option 2</label>
//           <input type="file" onChange={onFileChange} />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Option 3</label>
//           <input type="file" onChange={onFileChange} />
//         </div>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onFileUpload}
//           disabled={!selectedFile}
//         >
//           Upload File
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;



















app.get("/getImages", async(req, res) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("Authorization header is missing");
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        
        const userEmail = decodedToken.email;

        const user = await User.findOne({email: userEmail});
        
        // Retrieve the base64 images from the user object
        const image1 = user.image1;
        const image2 = user.image2;
        const image3 = user.image3;
        const image4 = user.image4;

        // Return the base64 images as JSON response
        res.json({status: "ok", image1, image2, image3, image4});
    }catch(error){
        console.log(error);
        res.json({status: "error", error: error.message});
    }
});
