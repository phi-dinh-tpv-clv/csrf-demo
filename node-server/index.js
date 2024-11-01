const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Sử dụng cookie-parser để đọc cookie dễ dàng hơn thông qua req.cookies
app.use(cookieParser());

// Tạo cookie mới
app.get("/set-cookie", (req, res) => {
  // Điều này tương tự như res.setHeader('Set-Cookie', 'username=John Doe; Max-Age=3600')
  res.cookie("username", "John Doe", {
    maxAge: 3600 * 1000,
    httpOnly: true,
    secure: true,
  });
  res.send("Cookie đã được tạo");
});

// Đọc cookie
app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
  res.send(`Cookie "username" có giá trị là: ${username}`);
});

// home page
app.get("/", (req, res) => {
  res.send(
    "Xin chào! Hãy tạo hoặc đọc cookie bằng cách truy cập /set-cookie hoặc /get-cookie"
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
