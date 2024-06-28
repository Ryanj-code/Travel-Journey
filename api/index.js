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
  res.json("test ok 6/26");
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
    const { userID, title, date, location, content } = req.query;

    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }

    // Build the query object
    const query = { userID };

    // Set up the query search.
    // query.[value] sets the field, $regex: sets what is used to match in,
    // $options are optional, here "i" is used for case-insensitive search
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (date) {
      query.date = date;
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (content) {
      query.content = { $regex: content, $options: "i" };
    }

    // console.log("Querying entries with:", query); // Log the query

    const entries = await Entry.find(query);
    res.status(200).json(entries);
  } catch (err) {
    console.error("Error retrieving entries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addentry", async (req, res) => {
  try {
    const { title, date, location, content, photos, userID } = req.body;
    console.log(req.body);

    const entryDoc = await Entry.create({
      title,
      date,
      location,
      content,
      photos,
      createdAt: Date.now(),
      updateAt: Date.now(),
      userID,
    });
    res.status(201).json({ message: "Entry added successfully", entryDoc });
  } catch (err) {
    console.error("Error adding entry:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteentry/:entryID", async (req, res) => {
  try {
    const { entryID } = req.params;
    const existingEntry = await Entry.findById(entryID);
    if (!existingEntry) return res.status(404).json({ err: "Entry not found" });

    await Entry.findByIdAndDelete(entryID);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting entry:", err.message, err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/editentry/:id", async (req, res) => {
  try {
    const entryID = req.params.id;
    const { title, date, location, content, photos, createdAt, userID } =
      req.body;

    const updatedData = {
      title,
      date,
      location,
      content,
      photos,
      createdAt,
      updateAt: Date.now(),
      userID,
    };

    const result = await Entry.findByIdAndUpdate(entryID, updatedData, {
      new: true,
    });
    if (!result) return res.status(404).json({ err: "Entry not found" });
    res.status(200).json({ message: "Entry edited successfully" });
  } catch (err) {
    console.error("Error updating entry:", err.message, err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/entry/:id", async (req, res) => {
  const entryId = req.params.id;
  try {
    const entry = await Entry.findById(entryId);
    if (!entry) {
      return res.status(404).send("Entry not found");
    }
    res.json(entry);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
