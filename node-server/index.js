const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("node:crypto");
const cors = require("cors");
const database = require("./database.json");

const app = express();

let token = "";

app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// login
app.post("/login", (req, res) => {
  token = crypto.randomBytes(32).toString("hex");

  console.log("token", token);
  res.cookie("token", token, {
    maxAge: 3600 * 1000,
    httpOnly: true,
    // secure: false,
    sameSite: "none", // false, true, lax, none, strict
  });

  res.json({
    success: true,
    token,
  });
});

app.post("/change-password", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  res.status(200).json({
    success: true,
    message: "Change password successfully",
  });
});

app.post("/add-post", (req, res) => {
  console.log("-------------> ", req.body);
  const { content } = req.body;
  console.log("cokkieeeee", req.cookies);
  database.push({
    title: content ?? "",
    id: database.length + 1,
  });

  res.json({
    success: true,
    message: "Post successfully",
  });
});

app.get("/get-data", (req, res) => {
  res.json({
    success: true,
    data: database,
  });
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
