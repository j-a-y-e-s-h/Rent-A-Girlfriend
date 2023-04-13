const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);
