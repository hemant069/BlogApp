const express = require("express");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server Listening

app.listen(PORT, () => console.log("Server is Connected"));
