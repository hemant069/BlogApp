const express = require("express");
const connectDB = require("./connect");
const user = require("./router/user");
const { checkAuth } = require("./middlewares/AuthMiddleware");
const cors = require("cors");
const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Middleware  is added here

app.use(checkAuth());

// Database connection function call is here

connectDB();

// Check To running backend properly or not
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

app.post("/api/test", (req, res) => {
  res.status(200).json({ message: "Test successful!" });
});

app.use("/api", user);

app.listen(PORT, () => console.log("Server is connected"));
