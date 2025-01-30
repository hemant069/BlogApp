const express = require("express");
const connectDB = require("./connect");
const user = require("./router/user");
const { checkAuth } = require("./middlewares/AuthMiddleware");
const cors = require("cors");
const app = express();

const PORT = 8000;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(cors());

// Middleware  is added here

app.use(checkAuth());

// Database connection function call is here

connectDB()
  .then((res) => console.log("DB is connected"))
  .catch((err) => console.log("Erro in db", err.message));

// Check To running backend properly or not
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

app.post("/api/test", (req, res) => {
  res.status(200).json({ message: "Test successful!" });
});

app.use("/api", user);

app.listen(PORT, () => console.log("Server is connected"));
