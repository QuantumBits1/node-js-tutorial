require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const User = require("./model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const JWTAuthService = require("./services/auth_service");

// Register
app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email }).exec();

    if (oldUser)
      return res.status(409).send("User already exist. Please login!");

    hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: hashedPassword
    });
    
    const token = JWTAuthService.JWTIssuer({ user_id: user._id}, "2h")
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let foundUser = await User.findOne({ email }).exec();
    
    if (!foundUser)
      return res.status(409).send("Incorrect email and/or password!");

    const isMatch = await bcrypt.compare(password, foundUser.password);
     
    if(isMatch) {
      return res.status(200).send(`Welcome ${foundUser.first_name} ${foundUser.last_name}!`);
      
    }
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;