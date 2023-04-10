const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

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
  if (!User) {
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

app.listen(5000, () => {
  console.log("server started....");
});
