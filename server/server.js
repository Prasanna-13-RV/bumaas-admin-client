const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
// const auth = require("./routes/auth");
const admin = require("./routes/admin");

// app.use(express.json());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

// app.get("/", auth);
app.use("/admin", admin);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
