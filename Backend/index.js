const express = require("express");
const connectDB = require("./connect");

// All required router is start from
const user = require("./router/user");
const blog = require("./router/blog");
const comment = require("./router/comment");
const reaction = require("./router/reactions");
const saveblogs = require("./router/saveblogs");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/AuthMiddleware");



const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // IMPORTANT
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



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

app.use("/api",  user);
app.use("/api/blog", checkAuth(), blog);
app.use("/api/comment", checkAuth(), comment);
app.use("/api/reaction", checkAuth(), reaction);
app.use("/api/saveblogs", checkAuth(), saveblogs);

// Server is Here
app.listen(PORT, () => console.log("Server is connected"));
