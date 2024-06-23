const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
// const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Entry = require("./models/Entry.js");
const cookierParser = require("cookie-parser");
// const imageDownloader = require("image-downloader");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookierParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok 6/17");
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    // Creates user in db
    // then signs a token with the info
    jwt.sign(
      {
        email: userDoc.email,
        id: userDoc._id,
      },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            httpOnly: true, // ensures the cookie is not accessible via JavaScript, enhancing security
            secure: true, // ensures the cookie is sent over HTTPS only
            sameSite: "strict", // helps prevent CSRF attacks by ensuring the cookie is sent only in a first-party context
          })
          .status(201)
          .json(userDoc);
      }
    );
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(422).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email });
    // search db for user based on email

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          }, // user's email and user's id from db
          jwtSecret, // secret key for jwt
          {}, // options(empty)
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
              })
              .json(userDoc);
          } // callback function
        );
      } else {
        res.status(422).json("Password is not correct");
      }
    } else {
      res.json("User not found");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(422).json({ error: err.message });
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, id } = await User.findById(userData.id);
      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/getentries", async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }
    const entries = await Entry.find({ userID });
    res.status(200).json(entries);
  } catch (err) {
    console.error("Error retrieving entries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addentry", async (req, res) => {
  try {
    const { date, location, entry, photoURL, userID } = req.body;

    const entryDoc = await Entry.create({
      date,
      location,
      text: entry,
      photos: [photoURL],
      userID: userID,
    });
    res.status(201).json({ message: "Entry added successfully", entryDoc });
  } catch (err) {
    console.error("Error adding entry:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteentry/:entryID", async (req, res) => {
  try {
    const entryID = req.params.entryID;
    const existingEntry = await Entry.findById(entryID);
    if (!existingEntry) return res.status(404).json({ err: "Entry not found" });

    await Entry.findByIdAndDelete(entryID);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting entry:", err.message, err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
