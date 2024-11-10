const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto = require("node:crypto");
const cors = require("cors");

const database = [];
const PORT = 3000;
const app = express();

let token = "";

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const csrfProtection = (req, res, next) => {
  const { csrfToken } = req.body;
  const tokenFromCookie = req.cookies.csrfToken;
  if (!csrfToken || csrfToken !== tokenFromCookie) {
    return res.status(403).send("CSRF Token is invalid");
  }
  next();
};

const authMiddleware = (req, res, next) => {
  if (req.cookies.token !== token) {
    return res.status(401).send(
      `
        <h3>Unauthorized</h3>
        <div>Please log in <a href='/login'>/login</a></div>
        `
    );
  }
  next();
};

app.get("/login", (req, res) => {
  token = crypto.randomBytes(32).toString("hex");
  res.cookie("token", token, {
    maxAge: 3600 * 1000,
    httpOnly: true, // prevent access to the cookie from JavaScript
    secure: true, // Set to true if using HTTPS
    sameSite: true, // false, true, lax, none, strict. Allow the cookie to be sent across different origins
  });

  const csrfToken = crypto.randomBytes(32).toString("hex");
  res.cookie("csrfToken", csrfToken);

  res.send(`
    <h3>Logged in successfully!</h3>
    <div>Back to <a href='/'>Homepage</a> to posts</div>
    <br/>
    <div>Logout <a href='/logout'>Logout</a></div>
  `);
});

// app.post("/submit-post", authMiddleware, csrfProtection, (req, res) => {
app.post("/submit-post", authMiddleware, (req, res) => {
  // add post into database
  const { content } = req.body;
  database.push(content);
  res.send(
    `<div>Post successfully, back to <a href='/'>Homepage</a> for viewing the posts</div>`
  );
});

app.get("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// Homepage
app.get("/", authMiddleware, (req, res) => {
  const tokenFromCookie = req.cookies.csrfToken;

  res.send(`
  <html><body>
  <form action='/submit-post' method='post'>
    <textarea type="text" placeholder="What are you thinking" name="content"></textarea>
    <input type="hidden" name="csrfToken" value="${tokenFromCookie}" />
    <button type="submit">Post</button>
  </form>
  <div>Your posts: </div>
  <ul>
  ${database.map((content) => `<li>${content}</li>`).join("")}
  </ul>
  <br/>
  <a href='/logout'>Logout</a>
  </body></html>
  `);
});

app.listen(PORT, () => {
  console.log(`Website is running on http://localhost:${PORT}`);
});
