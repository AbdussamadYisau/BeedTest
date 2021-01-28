const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const auctionPost = require("./routes/auctionPost");
const auctionGet = require("./routes/auctionGet");
const cors = require("cors");
require("dotenv/config");

// Middlewares
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true }));

// For CORs

app.use(cors());

// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// Routes
app.use(auctionPost);
app.use(auctionGet);

app.get("/", (req, res) => {
  // Health Check
  res.send("The API is up and running.");
});

app.get("*", (req, res) => {
  res.status(404).json({
    error: 404,
    message: "The resource you requested does not exist.",
  });
});

// Mongo Client
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB!");
  }
);

// Listening port
app.listen(process.env.PORT || 8080, () => {
  console.log(
    `This application is running on port ${process.env.PORT || 8080} `
  );
});
