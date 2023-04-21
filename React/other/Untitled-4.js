const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const JWT_SECRET =
  "JDBCHBDkjdsncsdbn()sbchdshcb[]sjdchbvgsdv54c56s45dc4s4?sdjukbcjhbd";

const mongoUrl =
  "mongodb+srv://jayesh:1234@userdata.lhzdiif.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected To Database....");
  })
  .catch((e) => console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    const newUser = await User.create({
      name,
      email,
      password: encryptPassword,
    });
    console.log(newUser);
    res.send({ status: "ok" });
    console.log("Registered user successfully");
  } catch (error) {
    console.error(error);
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email:user.email}, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/NewNavbar", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "ok", data: data });
      });
  } catch (error) {}
});

app.post("/addImages", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const userEmail = decodedToken.email;

    let { image1, image2, image3, image4 } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { image1, image2, image3, image4 },
      { new: true }
    );

    res.json({
      status: "ok",
      message: "Images added successfully",
      image1: updatedUser.image1,
      image2: updatedUser.image2,
      image3: updatedUser.image3,
      image4: updatedUser.image4,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: error.message });
  }
});


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

app.listen(5000, () => {
  console.log("server started....");
});
