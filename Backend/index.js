const express = require("express");

const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Check To running backend properly or not
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

app.listen(PORT, () => console.log("Server is connected"));
