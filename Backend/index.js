const express = require("express");
const connectDB = require("./connect");
const user = require("./router/user");
const blog = require("./router/blog");
const comment = require("./router/comment");
const { checkAuth } = require("./middlewares/AuthMiddleware");
const cors = require("cors");
const app = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Middleware  is added here

// app.use(checkAuth());

// Database connection function call is here

connectDB()
  .then((res) => console.log("DB is connected"))
  .catch((err) => console.log("Erro in db", err.message));

// Check To running backend properly or not
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

// API Router is Here

app.use("/api", user);
app.use("/api/blog", checkAuth(), blog);
app.use("/api/comment", checkAuth(), comment);

// Server is Here
app.listen(PORT, () => console.log("Server is connected"));
