const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("node:crypto");
const cors = require("cors");
const database = require("./database.json");

const app = express();

let token = "";

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const whitelist = ["http://localhost:5173", "http://localhost:5001"];
app.use(
  cors({
    credentials: true,
    // origin: "*",
    // allow cookies to be sent with requests
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);

// login
app.post("/login", (req, res) => {
  console.log(req.headers, req.cookies, req.body);
  token = crypto.randomBytes(32).toString("hex");
  console.log("token", token);

  res.cookie("token", token, {
    maxAge: 3600 * 1000, // 1 hour expiration
    httpOnly: false, // prevent access to the cookie from JavaScript
    // secure: false, // Set to true if using HTTPS
    // sameSite: "none", // false, true, lax, none, strict. Allow the cookie to be sent across different origins
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
  const { content } = req.body;
  console.log("------> content", req.body, content);

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

app.post("/logout", (req, res) => {
  console.log("logout");
  res.clearCookie("token", {
    // httpOnly: true,
    // secure: false, // Set to true if using HTTPS
    // sameSite: "None",
  });

  res.json({ message: "Logged out successfully" });
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
