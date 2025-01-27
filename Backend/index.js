const express = require("express");
const connectDB = require("./connect");
const user = require("./router/user");
const { checkAuth } = require("./middlewares/AuthMiddleware");

const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware  is added here

// app.use(checkAuth);

// Database connection function call is here

connectDB();

// Check To running backend properly or not
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

app.use("/api", checkAuth, user);

app.listen(PORT, () => console.log("Server is connected"));
